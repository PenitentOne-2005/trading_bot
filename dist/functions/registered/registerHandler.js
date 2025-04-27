"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createWallet_1 = __importDefault(require("../create/createWallet"));
const encryptPrivateKey_1 = require("../encrypt/encryptPrivateKey");
const saveUser_1 = __importDefault(require("../save/saveUser"));
const sendMessage_1 = __importDefault(require("../send/sendMessage"));
const isUserRegistered_1 = __importDefault(require("./isUserRegistered"));
const registerHandler = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat, from } = msg;
    const username = (from === null || from === void 0 ? void 0 : from.username) || "Неизвестный";
    if (yield (0, isUserRegistered_1.default)(chat.id)) {
        return (0, sendMessage_1.default)(chat.id, "Ты уже зарегистрирован! 🚀");
    }
    try {
        const result = yield (0, createWallet_1.default)();
        if (!result)
            throw new Error("Ошибка создания кошелька.");
        const { privateKey, address } = result;
        const encryptedPrivateKey = (0, encryptPrivateKey_1.saveEncryptedPrivateKey)(privateKey);
        yield (0, saveUser_1.default)({ chat, username, address, encryptedPrivateKey });
        (0, sendMessage_1.default)(chat.id, `Твой кошелек был создан: ${address.base58}`);
    }
    catch (error) {
        console.error("❌ Ошибка при создании кошелька:", error);
        (0, sendMessage_1.default)(chat.id, "Не удалось создать кошелек. Попробуй позже.");
    }
});
exports.default = registerHandler;
