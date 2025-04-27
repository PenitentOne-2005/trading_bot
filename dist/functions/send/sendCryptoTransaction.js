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
const dotenv_1 = __importDefault(require("dotenv"));
const sendMessage_1 = __importDefault(require("./sendMessage"));
dotenv_1.default.config();
const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS;
const sendCryptoTransaction = (tronWebUser, amount, chatId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const sunAmount = new BigNumber(tronWebUser.toSun(amount));
        const result = yield tronWebUser.trx.sendTransaction(ESCROW_ADDRESS, sunAmount.toNumber());
        console.log("✅ Транзакция отправлена:", result);
        (0, sendMessage_1.default)(chatId, `✅ Продано ${amount} TRX. Транзакция отправлена.`);
    }
    catch (error) {
        console.error("❌ Ошибка при отправке:", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        (0, sendMessage_1.default)(chatId, `❌ Ошибка при продаже: ${JSON.stringify(((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message)}`);
    }
});
exports.default = sendCryptoTransaction;
