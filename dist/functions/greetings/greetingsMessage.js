"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sendMessage_1 = __importDefault(require("../send/sendMessage"));
dotenv_1.default.config();
const greetings = process.env.GREETINGS;
if (!greetings) {
    console.error("❌ GREETINGS не найден! Убедитесь, что он задан в .env файле.");
    process.exit(1);
}
const greetingsMessage = (msg) => {
    (0, sendMessage_1.default)(msg.chat.id, greetings);
};
exports.default = greetingsMessage;
