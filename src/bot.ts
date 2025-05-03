const dotenv = require("dotenv");
dotenv.config();

const bot = require("./botInstance");
const registerHandler = require("./functions/registered/registerHandler");
const processUserMessage = require("./functions/send/processUserMessage");
const showWalletBalance = require("./functions/balance/showWalletBalance");
const greetingsMessage = require("./functions/greetings/greetingsMessage");
const createExchange = require("./functions/create/createExchange");
const buyCrypto = require("./functions/send/buyCrypto");
const showOrders = require("./functions/orders/showOrders");

bot.on("message", processUserMessage);

bot.onText(/\/createWallet/, registerHandler);
bot.onText(/\/showBalance/, showWalletBalance);
bot.onText(/\/createExchange/, createExchange);
bot.onText(/\/buyCrypto/, buyCrypto);
bot.onText(/\/showOrders/, showOrders);
bot.onText(/\/start/, greetingsMessage);

bot.on("polling_error", (error: any) => {
  console.error("❌ Ошибка опроса бота:", error);
});
