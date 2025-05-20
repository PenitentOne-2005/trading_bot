import dotenv from "dotenv";

dotenv.config();

import bot from "./botInstance.js";
import registerHandler from "./functions/registered/registerHandler.js";
import processUserMessage from "./functions/processUserMessage/processUserMessage.js";
import showWalletBalance from "./functions/showWalletBalance/showWalletBalance.js";
import createExchange from "./functions/createExchangeMenu/createExchangeMenu.js";
import buyCrypto from "./functions/buyCryptoMenu/buyCryptoMenu.js";
import sendMessage from "./functions/sendMessage/sendMessage.js";

const greetings = process.env.GREETINGS;
if (!greetings) {
  console.error(
    "❌ GREETINGS не найден! Убедитесь, что он задан в .env файле."
  );
  process.exit(1);
}

bot.on("message", processUserMessage);

bot.onText(/\/createWallet/, registerHandler);

bot.onText(/\/showBalance/, showWalletBalance);

bot.onText(/\/createExchange/, createExchange);

bot.onText(/\/buyCrypto/, buyCrypto);

// bot.onText(/\/showOrders/, showOrders);

// bot.onText(/\/createOrder/, showOrders);

bot.on("my_chat_member", async (msg) => {
  const status = msg.new_chat_member?.status;
  const chatId = msg.chat.id;

  if (status === "member") {
    await sendMessage(chatId, greetings, {
      reply_markup: {
        keyboard: [[{ text: "Старт" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }
});

bot.on("polling_error", (error) => {
  console.error("❌ Ошибка опроса бота:", error);
});
