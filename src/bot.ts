import dotenv from "dotenv";

dotenv.config();

import bot from "./botInstance.js";
import registerHandler from "./functions/registered/registerHandler.js";
import processUserMessage from "./functions/processUserMessage/processUserMessage.js";
import showWalletBalance from "./functions/showWalletBalance/showWalletBalance.js";
import createExchange from "./functions/createExchangeMenu/createExchangeMenu.js";
import buyCrypto from "./functions/buyCryptoMenu/buyCryptoMenu.js";
import sendMessage from "./functions/sendMessage/sendMessage.js";
import MESSAGE_TEXT from "./functions/messageHandlers/contentText.js";
import { selectLanguageBoard } from "./functions/messageHandlers/selectLanguageBoard.js";
import { agreeKeyBoard } from "./functions/messageHandlers/agreeKeyBoard.js";
import { mainMenu } from "./mainMenu.js";
import { userState } from "./userState.js";
import { userOffsets } from "./userOffsets.js";
import { showOrdersKeyBoard } from "./functions/messageHandlers/showOrdersKeyBoard.js";
import { sellMenu } from "./functions/messageHandlers/sellMenu.js";
import { myOrdersKeyBoard } from "./functions/messageHandlers/myOrdersKeyBoard.js";
import { helpKeyBoard } from "./functions/messageHandlers/helpKeyBoard.js";
import showBuyMenu from "./functions/showBuyMenu/showBuyMenu.js";
import showSellMenu from "./functions/showSellMenu/showSellMenu.js";

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

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message?.chat.id;
  const data = callbackQuery.data;

  if (!chatId || !data) return;

  switch (data) {
    // 🌐 Выбор языка
    case "lang_en":
      await bot.sendMessage(
        chatId,
        MESSAGE_TEXT.unsuportLang,
        selectLanguageBoard
      );
      break;
    case "lang_ua":
      await bot.sendMessage(chatId, MESSAGE_TEXT.lang, agreeKeyBoard);
      break;

    // ✅ Согласие
    case "agree_yes":
      await bot.sendMessage(chatId, MESSAGE_TEXT.greetings, mainMenu);
      break;
    case "agree_no":
      await bot.sendMessage(
        chatId,
        MESSAGE_TEXT.selectLang,
        selectLanguageBoard
      );
      break;

    // 📂 Головне меню
    case "wallet":
      await bot.sendMessage(chatId, "💼 Ваш гаманець:");
      break;
    case "allOrders":
      userOffsets[chatId] = 0;
      await bot.sendMessage(chatId, MESSAGE_TEXT.allOrders, showOrdersKeyBoard);
      break;
    case "myOrders":
      await bot.sendMessage(chatId, MESSAGE_TEXT.myOrders, myOrdersKeyBoard);
      break;
    case "createOrder":
      userState[chatId] = { step: "waitingForCrypto" };
      await bot.sendMessage(chatId, MESSAGE_TEXT.buyText, sellMenu);
      break;
    case "help":
      await bot.sendMessage(chatId, MESSAGE_TEXT.help, helpKeyBoard);
      break;

    // 💰 Покупка / Продажа
    case "buy_crypto":
      showBuyMenu(userOffsets, chatId);
      break;
    case "sell_crypto":
      showSellMenu(userOffsets, chatId);
      break;

    // 📋 Замовлення
    case "pending_orders":
      await bot.sendMessage(chatId, "⏳ Очікують реакції:");
      break;
    case "active_orders":
      await bot.sendMessage(chatId, "✅ Активні оголошення:");
      break;
    case "finished_orders":
      await bot.sendMessage(chatId, "📦 Завершені оголошення:");
      break;

    // 🔘 Продаж конкретної валюти
    case "sell_trx":
      await bot.sendMessage(chatId, "🔄 Ви обрали TRX для продажу.");
      break;
    case "sell_usdt":
      await bot.sendMessage(chatId, "🔄 Ви обрали USDT для продажу.");
      break;

    // ⬅️ Назад
    case "back":
      userState[chatId] = { step: "idle" };
      await bot.sendMessage(chatId, "🔙 Главное меню:", mainMenu);
      break;

    default:
      await bot.sendMessage(chatId, "❓ Невідома команда.");
      break;
  }

  // Удалить "часики" на кнопке
  await bot.answerCallbackQuery(callbackQuery.id);
});

bot.on("polling_error", (error) => {
  console.error("❌ Ошибка опроса бота:", error);
});
