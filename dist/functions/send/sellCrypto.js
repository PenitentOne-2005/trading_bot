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
const tronweb_1 = require("tronweb");
const dotenv_1 = __importDefault(require("dotenv"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const encryptPrivateKey_1 = __importDefault(require("../encrypt/encryptPrivateKey"));
const getWalletBalance_1 = __importDefault(require("../balance/getWalletBalance"));
const sendMessage_1 = __importDefault(require("./sendMessage"));
const sendCryptoTransaction_1 = __importDefault(require("./sendCryptoTransaction"));
dotenv_1.default.config();
const TRONGRID_API_KEY = process.env.TRONGRID_API_KEY;
const sellCrypto = (amount, chatId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const privateKey = (0, encryptPrivateKey_1.default)();
        if (!privateKey) {
            return (0, sendMessage_1.default)(chatId, "❌ Приватный ключ не найден");
        }
        const tronWebUser = new tronweb_1.TronWeb({
            fullHost: "https://api.trongrid.io",
            headers: { "TRON-PRO-API-KEY": TRONGRID_API_KEY },
            privateKey,
        });
        const balanceRaw = yield (0, getWalletBalance_1.default)();
        if (balanceRaw == null)
            return;
        const balanceInSun = new bignumber_js_1.default(tronWebUser.toSun(balanceRaw));
        if (balanceInSun.isLessThan(new bignumber_js_1.default(tronWebUser.toSun(amount)))) {
            return (0, sendMessage_1.default)(chatId, "❌ Недостаточно средств на кошельке.");
        }
        yield (0, sendCryptoTransaction_1.default)(tronWebUser, amount, chatId);
    }
    catch (error) {
        console.error("❌ Ошибка при отправке:", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        (0, sendMessage_1.default)(chatId, `❌ Ошибка при продаже: ${JSON.stringify(((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message)}`);
    }
});
exports.default = sellCrypto;
