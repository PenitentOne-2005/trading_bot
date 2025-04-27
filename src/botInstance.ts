import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error(
    "❌ BOT_TOKEN не найден! Убедитесь, что он задан в .env файле."
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

export default bot;
