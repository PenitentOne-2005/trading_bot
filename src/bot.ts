import dotenv from "dotenv";
dotenv.config();

import bot from "./botInstance.js";
import {
  handleCallbackQuery,
  processUserMessage,
  CRYPTOS,
  userState,
  mainMenu,
} from "./exports.js";
import recoverTable from "./recovery.js";

const greetings = process.env.GREETINGS;
if (!greetings) {
  console.error(
    "bot.js: ❌ GREETINGS не найден! Убедитесь, что он задан в .env файле.",
  );
  process.exit(1);
}

bot.on("message", processUserMessage);

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message?.chat.id;
  const username = callbackQuery.message?.chat.username;
  const text = callbackQuery.message?.text;
  const data = callbackQuery.data;

  if (!chatId || !data || !text || !username) return;

  const currentState = userState[chatId] ?? { step: "idle" };

  await handleCallbackQuery(data, {
    currentState,
    CRYPTOS,
    text,
    chatId,
    userState,
    username,
    mainMenu,
  });

  // Удалить "часики" на кнопке
  await bot.answerCallbackQuery(callbackQuery.id);
});

bot.on("polling_error", (error) => {
  console.error("bot.js: ❌ Ошибка опроса бота:", error);
});

const bootstrap = async () => {
  try {
    await recoverTable();

    bot.startPolling();
    console.log("bot.js: 🤖 Bot started");
  } catch (err) {
    console.error("bot.js: ❌ Startup error:", err);
    process.exit(1);
  }
};

bootstrap();