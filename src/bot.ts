import dotenv from "dotenv";

dotenv.config();

import bot from "./botInstance.js";
import processUserMessage from "./functions/processUserMessage/processUserMessage.js";
import buyCrypto from "./functions/buyCryptoMenu/buyCryptoMenu.js";
import { mainMenu } from "./menu.js";
import { userState } from "./userState.js";
import CRYPTOS from "./listCrypto.js";
import handleCallbackQuery from "./functions/handleCallbackQuery/handleCallbackQuery.js";

const greetings = process.env.GREETINGS;
if (!greetings) {
  console.error(
    "❌ GREETINGS не найден! Убедитесь, что он задан в .env файле."
  );
  process.exit(1);
}

bot.on("message", processUserMessage);

bot.onText(/\/buyCrypto/, buyCrypto);

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message?.chat.id;
  const username = callbackQuery.message?.chat.username;
  const text = callbackQuery.message?.text;
  const data = callbackQuery.data;

  if (!chatId || !data || !text || !username) return;

  const currentState = userState[chatId] ?? { step: "idle" };

  const props = {
    currentState,
    CRYPTOS,
    text,
    chatId,
    userState,
    username,
    mainMenu,
  };

  await handleCallbackQuery(data, props);

  // Удалить "часики" на кнопке
  await bot.answerCallbackQuery(callbackQuery.id);
});

bot.on("polling_error", (error) => {
  console.error("❌ Ошибка опроса бота:", error);
});
