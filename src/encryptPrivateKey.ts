const CryptoJS = require("crypto-js");
import dotenv from "dotenv";

dotenv.config();

const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
  throw new Error("ENCRYPTION_KEY is not defined in .env file!");
}

const iv = CryptoJS.lib.WordArray.random(16); // 16-байтовый IV

export function encryptPrivateKey(privateKey: string): string {
  return CryptoJS.AES.encrypt(privateKey, CryptoJS.MD5(encryptionKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}
