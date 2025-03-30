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

export default encryptPrivateKey;
