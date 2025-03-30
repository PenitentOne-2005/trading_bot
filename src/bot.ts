import bot from "./botInstance";
import registerHandler from "./functions/registered/registerHandler";
import processUserMessage from "./functions/send/processUserMessage";
import showWalletBalance from "./functions/balance/showWalletBalance";
import greetingsMessage from "./functions/greetings/greetingsMessage";

bot.on("message", processUserMessage);

bot.onText(/\/register/, registerHandler);

bot.onText(/\/show/, showWalletBalance);

bot.onText(/\/start/, greetingsMessage);

bot.on("polling_error", (error) => {
  console.error("❌ Ошибка опроса бота:", error);
});
