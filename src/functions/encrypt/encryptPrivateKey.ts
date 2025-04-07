import fs from "fs";
const CryptoJS = require("crypto-js");
import dotenv from "dotenv";
import { IencryptPrivateKey } from "./interface";

dotenv.config();

const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
  throw new Error("ENCRYPTION_KEY is not defined in .env file!");
}

const iv = CryptoJS.lib.WordArray.random(16); // 16-байтовый IV

const encryptPrivateKey: IencryptPrivateKey = (privateKey) => {
  return CryptoJS.AES.encrypt(privateKey, CryptoJS.MD5(encryptionKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

export const saveEncryptedPrivateKey = (privateKey: string) => {
  const encryptedPrivateKey = encryptPrivateKey(privateKey);

  const data = {
    encrypted_private_key: encryptedPrivateKey,
    iv: iv.toString(CryptoJS.enc.Base64),
  };

  fs.writeFileSync("privateKeyData.json", JSON.stringify(data));

  return encryptedPrivateKey;
};

const decryptPrivateKey = (encryptedPrivateKey: string, iv: string): string => {
  const ivWordArray = CryptoJS.enc.Base64.parse(iv);
  const bytes = CryptoJS.AES.decrypt(
    encryptedPrivateKey,
    CryptoJS.MD5(encryptionKey),
    {
      iv: ivWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return bytes.toString(CryptoJS.enc.Utf8);
};

const getPrivateKey = () => {
  const fileData = fs.readFileSync("privateKeyData.json", "utf8");
  const { encrypted_private_key, iv } = JSON.parse(fileData);

  return decryptPrivateKey(encrypted_private_key, iv);
};

export default getPrivateKey;
