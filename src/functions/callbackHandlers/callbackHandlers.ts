import { Message } from "node-telegram-bot-api";
import pool from "../../db.js";
import sendMessage from "../sendMessage/sendMessage.js";
import MESSAGE_TEXT from "../../contentText.js";
import { userOffsets } from "../../userOffsets.js";
import { userState } from "../../userState.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import { CallbackProps } from "../../interface.js";
import showOrders from "../showOrders/showOrders.js";
import createOrder from "../create/createOrder.js";
import setPaymentMethod from "./setPaymentMethod.js";
import updateStatusToWaiting from "./updateStatusToWaiting.js";
import cancelPaymentProcess from "./cancelPaymentProcess.js";
import {
  agreeKeyBoard,
  helpKeyBoard,
  mainMenu,
  myOrdersKeyBoard,
  showOrdersKeyBoard,
} from "./menu.js";

const callbackHandlers: Record<
  string,
  (props: CallbackProps) => void | Promise<Message | void>
> = {
  lang_en: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.unsuportLang, selectLanguageBoard),

  lang_ua: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.lang, agreeKeyBoard),

  agree_buy: async ({ chatId, text }) => {
    const handleCryptoSelection = (
      await import("../handleCryptoSelection/handleCryptoSelection.js")
    ).default;

    const CRYPTOS = (await import("../../listCrypto.js")).default;

    if (!text) return;

    return handleCryptoSelection({ chatId, text, CRYPTOS, userState });
  },

  agree_sent: async ({ chatId }) => {
    const confirmPaymentNotification = (
      await import("./confirmPaymentNotification.js")
    ).default;

    return confirmPaymentNotification(userState, chatId);
  },

  agree_yes: async ({ chatId, username }) => {
    const isUserRegistered = (
      await import("../isUserRegistered/isUserRegistered.js")
    ).default;

    const registerHandler = (await import("../registered/registerHandler.js"))
      .default;

    const isUser = await isUserRegistered(chatId);
    if (!isUser) {
      registerHandler(chatId, username);
    }

    return sendMessage(chatId, MESSAGE_TEXT.greetings, mainMenu);
  },

  agree_no: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),

  wallet: async ({ chatId }) => {
    const showWallet = (await import("../showWallet/showWallet.js")).default;

    return await showWallet(chatId);
  },

  allOrders: async ({ chatId }) => {
    userOffsets[chatId] = 0;

    return sendMessage(chatId, MESSAGE_TEXT.allOrders, showOrdersKeyBoard);
  },

  myOrders: async ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.myOrders, myOrdersKeyBoard),

  createOrder: async ({ chatId }) => {
    const { createOrderMenu } = await import("../../createOrderMenu.js");

    return sendMessage(chatId, MESSAGE_TEXT.buyText, createOrderMenu);
  },

  pending_orders: ({ chatId }) => {},

  active_orders: async ({ chatId }) => {
    const buyQuery = `
    SELECT * FROM buy_requests WHERE chat_id = $1 AND status = 'active'`;
    const buyResult = await pool.query(buyQuery, [chatId]);

    const sellQuery = `SELECT * FROM sell_requests WHERE chat_id = $1 AND status = 'active'`;
    const sellResult = await pool.query(sellQuery, [chatId]);

    const allRequests = [...buyResult.rows, ...sellResult.rows];
  },

  help: async ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.help, helpKeyBoard),

  getPrivateKey: async ({ chatId }) => {
    const promptPrivateKeyConfirmation = (
      await import(
        "../promptPrivateKeyConfirmation/promptPrivateKeyConfirmation.js"
      )
    ).default;

    return promptPrivateKeyConfirmation(chatId);
  },

  private_key: async ({ chatId }) => {
    const sendPrivateKey = (await import("../sendPrivateKey/sendPrivateKey.js"))
      .default;

    return sendPrivateKey(chatId);
  },

  buy_crypto: async ({ chatId }) => {
    const showBuyMenu = (await import("../showBuyMenu/showBuyMenu.js")).default;

    return showBuyMenu(userOffsets, chatId);
  },

  sell_crypto: async ({ chatId }) => {
    const showSellMenu = (await import("../showSellMenu/showSellMenu.js"))
      .default;

    return showSellMenu(userOffsets, chatId);
  },

  create_buy_crypto: (props: CallbackProps) => {
    const { chatId } = props;

    userState[chatId] = {
      ...userState[chatId],
      orderType: "buy",
    };

    return createOrder(props);
  },

  create_sell_crypto: (props: CallbackProps) => {
    const { chatId } = props;

    userState[chatId] = {
      ...userState[chatId],
      orderType: "sell",
    };

    return createOrder(props);
  },

  show_crypto_next: ({ chatId }) => {
    userOffsets[chatId] = (userOffsets[chatId] ?? 0) + 2;

    const { currentDb } = userState[chatId] ?? {};

    showOrders({
      chatId,
      dbName: currentDb || "",
      userOffsets,
      text: "Список заявок",
    });
  },

  show_crypto_prev: ({ chatId }) => {
    userOffsets[chatId] = Math.max((userOffsets[chatId] ?? 0) - 2, 0);

    const { currentDb } = userState[chatId] ?? {};

    showOrders({
      chatId,
      dbName: currentDb || "",
      userOffsets,
      text: "Список заявок",
    });
  },

  pay_method: async ({ chatId }) => {
    const getPaymentFromDB = (
      await import("../getPaymentFromDB/getPaymentFromDB.js")
    ).default;

    const payMethod = (await import("./payMethod.js")).default;
    const savedPayment = await getPaymentFromDB(chatId);

    const props = { chatId, savedPayment, userState };
    payMethod(props);
  },

  show_payment_buy_info: async ({ chatId }) => {
    const showPaymentInfo = (await import("./showPaymentInfo.js")).default;

    const notifySellerEscrowStarted = (
      await import("./notifySellerEscrowStarted.js")
    ).default;

    await updateStatusToWaiting(userState, chatId, "sell_requests");

    await notifySellerEscrowStarted(userState, chatId);

    await showPaymentInfo(userState, chatId);
  },

  show_payment_sell_info: async ({ chatId }) => {
    const sendCryptoTransaction = (
      await import("../sendCryptoTransaction/sendCryptoTransaction.js")
    ).default;

    await sendCryptoTransaction(chatId);
  },

  add_pay: async ({ chatId }) => {
    const { paymentMethodKeyBoard } = await import("./menu.js");

    userState[chatId] = {
      ...userState[chatId],
      step: "waitingForPaymentMethod",
    };

    sendMessage(chatId, "Додати новий платіжний метод:", paymentMethodKeyBoard);
  },

  card: ({ chatId }) =>
    setPaymentMethod(chatId, "card", "Введіть номер вашої картки (16 цифр):"),

  IBAN: ({ chatId }) => setPaymentMethod(chatId, "IBAN", "Введiть номер IBAN:"),

  confirm_buy_order: async ({ chatId, username }) => {
    const confirmBuyOrder = (
      await import("../confirmBuyOrder/confirmBuyOrder.js")
    ).default;

    userState[chatId] = {
      ...userState[chatId],
      step: "confirmOrder",
    };

    if (!username) return;

    confirmBuyOrder({ chatId, username, userState });
  },

  cancel: async ({ chatId }) => {
    const orderId = userState[chatId]?.orderId;

    if (!orderId) {
      return sendMessage(chatId, "❗ Заявка не знайдена або вже оброблена.");
    }

    await cancelPaymentProcess(userState, chatId, orderId);
  },

  back: async ({ chatId }) => {
    const orderId = userState[chatId]?.orderId;

    if (!orderId) {
      return sendMessage(chatId, "❗ Заявка не знайдена або вже оброблена.");
    }

    await cancelPaymentProcess(userState, chatId, orderId);

    userState[chatId] = { step: "idle" };
    sendMessage(chatId, "🔙 Главное меню:", mainMenu);
  },
};

export default callbackHandlers;
