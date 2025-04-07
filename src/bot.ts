import bot from "./botInstance";
import registerHandler from "./functions/registered/registerHandler";
import processUserMessage from "./functions/send/processUserMessage";
import showWalletBalance from "./functions/balance/showWalletBalance";
import greetingsMessage from "./functions/greetings/greetingsMessage";
import createExchange from "./functions/create/createExchange";
import sellCrypto from "./functions/send/sellCrypto";

bot.on("message", processUserMessage);

bot.onText(/\/createWallet/, registerHandler);

bot.onText(/\/showBalance/, showWalletBalance);

bot.onText(/\/createExchange/, createExchange);

bot.onText(/\/start/, greetingsMessage);

bot.onText(/\/sellCrypto/, sellCrypto);

bot.on("polling_error", (error) => {
  console.error("❌ Ошибка опроса бота:", error);
});
