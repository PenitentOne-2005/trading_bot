import dotenv from "dotenv";

dotenv.config();

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
