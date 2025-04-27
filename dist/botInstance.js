"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.BOT_TOKEN;
if (!token) {
    console.error("❌ BOT_TOKEN не найден! Убедитесь, что он задан в .env файле.");
    process.exit(1);
}
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
exports.default = bot;
