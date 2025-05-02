import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
// Получаем __dirname вручную
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Загружаем .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import bot from "./botInstance.js";
import registerHandler from "./functions/registered/registerHandler.js";
import processUserMessage from "./functions/send/processUserMessage.js";
import showWalletBalance from "./functions/balance/showWalletBalance.js";
import greetingsMessage from "./functions/greetings/greetingsMessage.js";
import createExchange from "./functions/create/createExchange.js";
import buyCrypto from "./functions/send/buyCrypto.js";
import showOrders from "./functions/orders/showOrders.js";
bot.on("message", processUserMessage);
bot.onText(/\/createWallet/, registerHandler);
bot.onText(/\/showBalance/, showWalletBalance);
bot.onText(/\/createExchange/, createExchange);
bot.onText(/\/buyCrypto/, buyCrypto);
bot.onText(/\/showOrders/, showOrders);
bot.onText(/\/start/, greetingsMessage);
bot.on("polling_error", (error) => {
    console.error("❌ Ошибка опроса бота:", error);
});
