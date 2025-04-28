import dotenv from "dotenv";

dotenv.config();

import bot from "./botInstance.js";
import registerHandler from "./functions/registered/registerHandler";
import processUserMessage from "./functions/send/processUserMessage";
import showWalletBalance from "./functions/balance/showWalletBalance";
import greetingsMessage from "./functions/greetings/greetingsMessage";
import createExchange from "./functions/create/createExchange";
import buyCrypto from "./functions/send/buyCrypto";
import showOrders from "./functions/orders/showOrders";

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
