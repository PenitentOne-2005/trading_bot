import dotenv from "dotenv";
dotenv.config({ path: "/root/trading_bot/.env" });
import CryptoJS from "crypto-js";
import pool from "../../db.js";
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY is not defined in .env file!");
}
export const encryptPrivateKey = (privateKey) => {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(privateKey, CryptoJS.MD5(encryptionKey), {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return {
        encryptedKey: encrypted.toString(),
        iv: iv.toString(CryptoJS.enc.Base64),
    };
};
const decryptPrivateKey = (encryptedKey, ivBase64) => {
    const iv = CryptoJS.enc.Base64.parse(ivBase64);
    const decrypted = CryptoJS.AES.decrypt(encryptedKey, CryptoJS.MD5(encryptionKey), {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};
export const getPrivateKeyFromDB = async (userId) => {
    const res = await pool.query(`SELECT private_key, iv FROM users WHERE telegram_id = $1`, [userId]);
    if (res.rowCount === 0)
        return null;
    const { private_key, iv } = res.rows[0];
    return decryptPrivateKey(private_key, iv);
};
