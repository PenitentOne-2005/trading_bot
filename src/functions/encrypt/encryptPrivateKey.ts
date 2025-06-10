import dotenv from "dotenv";

dotenv.config({ path: "/root/trading_bot/.env" });

import CryptoJS from "crypto-js";
import { IGetPrivateKeyFromDB } from "./interface.js";
import pool from "../../db.js";

const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
  throw new Error("ENCRYPTION_KEY is not defined in .env file!");
}

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_keys (
      user_id BIGINT PRIMARY KEY,
      encrypted_private_key TEXT NOT NULL,
      iv TEXT NOT NULL
    );
  `);
};

const encryptPrivateKey = (privateKey: string) => {
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(
    privateKey,
    CryptoJS.MD5(encryptionKey),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return {
    encryptedKey: encrypted.toString(),
    iv: iv.toString(CryptoJS.enc.Base64),
  };
};

const decryptPrivateKey = (encryptedKey: string, ivBase64: string): string => {
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const decrypted = CryptoJS.AES.decrypt(
    encryptedKey,
    CryptoJS.MD5(encryptionKey),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const saveEncryptedPrivateKeyToDB = async (
  userId: number,
  privateKey: string
) => {
  const { encryptedKey, iv } = encryptPrivateKey(privateKey);

  await pool.query(
    `
    INSERT INTO user_keys (user_id, encrypted_private_key, iv)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id)
    DO UPDATE SET encrypted_private_key = EXCLUDED.encrypted_private_key, iv = EXCLUDED.iv
    `,
    [userId, encryptedKey, iv]
  );

  return encryptedKey;
};

export const getPrivateKeyFromDB: IGetPrivateKeyFromDB = async (userId) => {
  const res = await pool.query(
    `SELECT encrypted_private_key, iv FROM user_keys WHERE user_id = $1`,
    [userId]
  );

  if (res.rowCount === 0) return null;

  const { encrypted_private_key, iv } = res.rows[0];
  return decryptPrivateKey(encrypted_private_key, iv);
};

initDB()
  .then(() => console.log("Таблица user_keys готова"))
  .catch(console.error);
