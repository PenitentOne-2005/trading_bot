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
const buyCryptoKeyboard_1 = require("./buyCryptoKeyboard");
const sendMessage_1 = __importDefault(require("./sendMessage"));
const buyCrypto = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendMessage_1.default)(msg.chat.id, "Выберите опцию:", buyCryptoKeyboard_1.buyCryptoMenu);
});
exports.default = buyCrypto;
