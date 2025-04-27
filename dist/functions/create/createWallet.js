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
const { TronWeb } = require("tronweb");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const privateKey = crypto_1.default.randomBytes(32).toString("hex");
const tronWeb = new TronWeb({
    fullHost: process.env.QUICKNODE_RPC,
    privateKey: privateKey,
});
const createWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address } = yield tronWeb.createAccount();
        return { privateKey, address };
    }
    catch (error) {
        console.error("Ошибка при создании кошелька:", error);
    }
});
exports.default = createWallet;
