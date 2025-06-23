import { Message } from "node-telegram-bot-api";
import sendMessage from "../sendMessage/sendMessage.js";
import CRYPTOS from "../../listCrypto.js";
import MESSAGE_TEXT from "../../contentText.js";
import { userOffsets } from "../../userOffsets.js";
import handleCryptoSelection from "../handleCryptoSelection/handleCryptoSelection.js";
import showSummary from "../showSummary/showSummary.js";
import confirmBuyOrder from "../confirmBuyOrder/confirmBuyOrder.js";
import { userState } from "../../userState.js";
import showBuyMenu from "../showBuyMenu/showBuyMenu.js";
import showSellMenu from "../showSellMenu/showSellMenu.js";
import createBuyOrder from "../create/createBuyOrder.js";
import createSellOrder from "../create/createSellOrder.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import { agreeKeyBoard } from "./agreeKeyBoard.js";
import { mainMenu } from "./mainMenu.js";
import { showOrdersKeyBoard } from "./showOrdersKeyBoard.js";
import { myOrdersKeyBoard } from "./myOrdersKeyBoard.js";
import { createOrderMenu } from "../../createOrderMenu.js";
import { helpKeyBoard } from "./helpKeyBoard.js";
import { CallbackProps } from "../../interface.js";
import showOrders from "../showOrders/showOrders.js";
import isUserRegistered from "../isUserRegistered/isUserRegistered.js";
import registerHandler from "../registered/registerHandler.js";
import showWallet from "../showWallet/showWallet.js";
import promptPrivateKeyConfirmation from "../promptPrivateKeyConfirmation/promptPrivateKeyConfirmation.js";
import sendPrivateKeyWithWarning from "../sendPrivateKeyWithWarning/sendPrivateKeyWithWarning.js";

const callbackHandlers: Record<
  string,
  (props: CallbackProps) => void | Promise<Message | void>
> = {
  lang_en: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.unsuportLang, selectLanguageBoard),
  lang_ua: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.lang, agreeKeyBoard),

  agree_yes: async ({ chatId, username }) => {
    const isUser = await isUserRegistered(chatId);

    if (!isUser) {
      registerHandler(chatId, username);
    }

    return sendMessage(chatId, MESSAGE_TEXT.greetings, mainMenu);
  },
  agree_no: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),

  wallet: async ({ chatId }) => await showWallet(chatId),
  allOrders: ({ chatId }) => {
    userOffsets[chatId] = 0;
    sendMessage(chatId, MESSAGE_TEXT.allOrders, showOrdersKeyBoard);
  },
  myOrders: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.myOrders, myOrdersKeyBoard),
  createOrder: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.buyText, createOrderMenu),
  help: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.help, helpKeyBoard),

  getPrivateKey: ({ chatId }) => promptPrivateKeyConfirmation(chatId),

  private_key: async ({ chatId }) => sendPrivateKeyWithWarning(chatId),

  buy_crypto: ({ chatId }) => showBuyMenu(userOffsets, chatId),
  sell_crypto: ({ chatId }) => showSellMenu(userOffsets, chatId),
  create_buy_crypto: createBuyOrder,
  create_sell_crypto: createSellOrder,

  buy_crypto_next: ({ chatId }) => {
    userOffsets[chatId] = (userOffsets[chatId] ?? 0) + 2;
    showOrders({
      chatId,
      dbName: "buy_requests",
      userOffsets,
      text: "Список заявок",
    });
  },

  buy_crypto_prev: ({ chatId }) => {
    userOffsets[chatId] = Math.max((userOffsets[chatId] ?? 0) - 2, 0);
    showOrders({
      chatId,
      dbName: "buy_requests",
      userOffsets,
      text: "Список заявок",
    });
  },

  agree_buy: ({ chatId, text }) => {
    if (!text) return;

    handleCryptoSelection({ chatId, text, CRYPTOS, userState });
  },

  pay_method: ({ chatId }) => {
    const currentState = userState[chatId];
    showSummary(chatId, userState, currentState);
  },

  add_pay: ({ chatId }) => {
    sendMessage(chatId, "Додати новий платіжний метод:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Банківська карта", callback_data: "card" }],
          [{ text: "Банківський рахунок (IBAN)", callback_data: "IBAN" }],
          [{ text: "Назад", callback_data: "back" }],
        ],
      },
    });
  },

  card: async ({ chatId }) => {
    userState[chatId] = { step: "waitingForCard" };

    sendMessage(chatId, "Введіть номер вашої картки (16 цифр):", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Назад", callback_data: "back" }],
          [{ text: "Скасувати", callback_data: "back" }],
        ],
      },
    });
  },

  IBAN: async ({ chatId }) => {
    userState[chatId] = { step: "waitingForIBAN" };

    sendMessage(chatId, "Введiть номер IBAN:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Назад", callback_data: "back" }],
          [{ text: "Скасувати", callback_data: "back" }],
        ],
      },
    });
  },

  confirm_buy_order: ({ chatId, username }) => {
    if (!username) return;

    confirmBuyOrder({ chatId, username, userState });
  },

  back: async ({ chatId }) => {
    userState[chatId] = { step: "idle" };
    sendMessage(chatId, "🔙 Главное меню:", mainMenu);
  },
};

export default callbackHandlers;
