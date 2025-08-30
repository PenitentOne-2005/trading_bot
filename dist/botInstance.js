import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
const token = process.env.BOT_TOKEN;
if (!token) {
    console.error("❌ BOT_TOKEN не найден! Убедитесь, что он задан в .env файле.");
    process.exit(1);
}
const bot = new TelegramBot(token);
export default bot;
