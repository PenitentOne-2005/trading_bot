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
import { mainMenu } from "./functions/messageHandlers/mainMenu.js";
import { userState } from "./userState.js";
import { userOffsets } from "./userOffsets.js";
import { showOrdersKeyBoard } from "./functions/messageHandlers/showOrdersKeyBoard.js";
import { sellMenu } from "./functions/messageHandlers/sellMenu.js";
import { myOrdersKeyBoard } from "./functions/messageHandlers/myOrdersKeyBoard.js";
import { helpKeyBoard } from "./functions/messageHandlers/helpKeyBoard.js";
import showBuyMenu from "./functions/showBuyMenu/showBuyMenu.js";
import showSellMenu from "./functions/showSellMenu/showSellMenu.js";
import { createOrderMenu } from "./createOrderMenu.js";
import CRYPTOS from "./listCrypto.js";
import createBuyOrder from "./functions/create/createBuyOrder.js";
import createSellOrder from "./functions/create/createSellOrder.js";
import saveRequest from "./functions/saveRequests/saveRequest.js";

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
      await bot.sendMessage(chatId, MESSAGE_TEXT.buyText, createOrderMenu);
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

    case "create_buy_crypto":
      createBuyOrder(props);
      break;
    case "create_sell_crypto":
      createSellOrder(props);
      break;

    case "agree_buy":
      if (!CRYPTOS.includes(text)) {
        return sendMessage(
          chatId,
          "Виберіть криптовалюту, яку хочете купити:",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "USDT (TRC-20)", callback_data: "buy_USDT" }],
                [{ text: "USDC (TRC-20)", callback_data: "buy_USDC" }],
                [{ text: "TUSD (TRC-20)", callback_data: "buy_TUSD" }],
                [{ text: "DAI (TRC-20)", callback_data: "buy_DAI" }],
                [{ text: "Назад", callback_data: "back" }],
              ],
            },
          }
        );
      }
      userState[chatId] = {
        ...userState[chatId],
        step: "waitingForPrice",
        crypto: text,
      };
      sendMessage(chatId, `💰 Вкажіть суму в ${text}, яку хочете купити:`, {
        reply_markup: {
          inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
        },
      });
      break;

    case "buy_USDT":
    case "buy_USDC":
    case "buy_TUSD":
    case "buy_DAI": {
      const crypto = data.replace("buy_", "") + " (TRC-20)";
      userState[chatId] = {
        ...userState[chatId],
        step: "waitingForAmount",
        crypto,
      };
      await bot.sendMessage(
        chatId,
        `💰 Вкажіть суму в ${crypto}, яку хочете купити:`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
          },
        }
      );
      break;
    }

    case "confirmOrder": {
      const { crypto, amount, price, paymentMethod } = currentState;

      if (!crypto || !amount || !price || !paymentMethod) {
        await sendMessage(chatId, "❌ Помилка. Неповні дані заявки.");
        break;
      }

      await saveRequest("buy", username, crypto, amount, price);

      userState[chatId] = { step: "idle" };

      await sendMessage(
        chatId,
        `✅ Ваше оголошення успішно створено!\n Оголошення N: 123456 ${amount}\n Криптовалюта: ${crypto}\n Ціна ${price}\n Валюта оплати: UAH\n Спосіб оплати: ${paymentMethod}\n Термін дії: 24 години\n Що далі?`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Мої оголошення", callback_data: "allOrders" }],
              [{ text: "💼 Гаманець", callback_data: "wallet" }],
              [
                {
                  text: "Створити ще одно оголошення",
                  callback_data: "createOrder",
                },
              ],
            ],
          },
        }
      );
      break;
    }

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
