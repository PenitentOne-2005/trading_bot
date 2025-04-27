"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEncryptedPrivateKey = void 0;
const fs_1 = __importDefault(require("fs"));
const CryptoJS = require("crypto-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY is not defined in .env file!");
}
const iv = CryptoJS.lib.WordArray.random(16); // 16-байтовый IV
const encryptPrivateKey = (privateKey) => {
    return CryptoJS.AES.encrypt(privateKey, CryptoJS.MD5(encryptionKey), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();
};
const saveEncryptedPrivateKey = (privateKey) => {
    const encryptedPrivateKey = encryptPrivateKey(privateKey);
    const data = {
        encrypted_private_key: encryptedPrivateKey,
        iv: iv.toString(CryptoJS.enc.Base64),
    };
    fs_1.default.writeFileSync("privateKeyData.json", JSON.stringify(data));
    return encryptedPrivateKey;
};
exports.saveEncryptedPrivateKey = saveEncryptedPrivateKey;
const decryptPrivateKey = (encryptedPrivateKey, iv) => {
    const ivWordArray = CryptoJS.enc.Base64.parse(iv);
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, CryptoJS.MD5(encryptionKey), {
        iv: ivWordArray,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
};
const getPrivateKey = () => {
    const fileData = fs_1.default.readFileSync("privateKeyData.json", "utf8");
    const { encrypted_private_key, iv } = JSON.parse(fileData);
    return decryptPrivateKey(encrypted_private_key, iv);
};
exports.default = getPrivateKey;
