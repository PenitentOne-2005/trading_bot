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
const axios_1 = __importDefault(require("axios"));
const getWalletAddress_1 = __importDefault(require("../address/getWalletAddress"));
dotenv_1.default.config();
const getWalletBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const walletAddress = yield (0, getWalletAddress_1.default)();
        if (!process.env.QUICKNODE_RPC) {
            throw new Error("QUICKNODE_RPC не задан в переменных окружения");
        }
        const response = yield axios_1.default.post(process.env.QUICKNODE_RPC, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [walletAddress, "latest"],
            id: 1,
        });
        if (response.data && response.data.result !== undefined) {
            const balanceInSun = response.data.result;
            const balanceInTRX = balanceInSun / 1e6;
            return balanceInTRX;
        }
        else {
            throw new Error("Ошибка получения данных о балансе.");
        }
    }
    catch (error) {
        console.error("❌ Ошибка при получении баланса:", error.message);
    }
});
exports.default = getWalletBalance;
