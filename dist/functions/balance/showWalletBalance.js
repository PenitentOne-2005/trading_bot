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
const sendMessage_1 = __importDefault(require("../send/sendMessage"));
const getWalletBalance_1 = __importDefault(require("./getWalletBalance"));
const showWalletBalance = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat } = msg;
    try {
        const balance = yield (0, getWalletBalance_1.default)();
        (0, sendMessage_1.default)(chat.id, `Ваш баланс: ${balance} TRX`);
    }
    catch (error) {
        console.error("❌ Ошибка при получении баланса:", error);
        (0, sendMessage_1.default)(chat.id, "Не удалось получить баланс. Попробуй позже.");
    }
});
exports.default = showWalletBalance;
