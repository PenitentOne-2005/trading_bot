import { CallbackHandlers } from "./interface.js";
import {
  sendMessage,
  showOrders,
  createOrder,
  setPaymentMethod,
  updateStatusToWaiting,
  cancelPaymentProcess,
} from "@/functions/index.js";
import {
  selectLanguageBoard,
  agreeKeyBoard,
  helpKeyBoard,
  mainMenu,
  myOrdersKeyBoard,
  showOrdersKeyBoard,
  userOffsets,
  userState,
  MESSAGE_TEXT,
  CallbackProps,
} from "@/exports.js";

const callbackHandlers: Record<string, CallbackHandlers> = {
  lang_en: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.unsuportLang, selectLanguageBoard),

  lang_ua: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.lang, agreeKeyBoard),

  agree_buy: async ({ chatId, text }) => {
    const { handleCryptoSelection } = await import("@/functions/index.js");

    const { CRYPTOS } = await import("@/exports.js");

    if (!text) return;

    return handleCryptoSelection({ chatId, text, CRYPTOS, userState });
  },

  agree_sent: async ({ chatId }) => {
    const { confirmPaymentNotification } = await import("@/functions/index.js");

    return confirmPaymentNotification(userState, chatId);
  },

  agree_yes: async ({ chatId, username }) => {
    const { isUserRegistered, registerHandler } = await import(
      "@/functions/index.js"
    );

    const isUser = await isUserRegistered(chatId);
    if (!isUser) {
      registerHandler(chatId, username);
    }

    return sendMessage(chatId, MESSAGE_TEXT.greetings, mainMenu);
  },

  agree_no: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),

  wallet: async ({ chatId }) => {
    const { showWallet } = await import("@/functions/index.js");

    return await showWallet(chatId);
  },

  allOrders: ({ chatId }) => {
    userOffsets[chatId] = 0;

    return sendMessage(chatId, MESSAGE_TEXT.allOrders, showOrdersKeyBoard);
  },

  myOrders: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.myOrders, myOrdersKeyBoard),

  createOrder: async ({ chatId }) => {
    const { createOrderMenu } = await import("@/exports.js");

    return sendMessage(chatId, MESSAGE_TEXT.buyText, createOrderMenu);
  },

  pending_orders: ({ chatId }) => {},

  active_orders: async ({ chatId }) => {
    const { renderActiveOrders } = await import("@/functions/index.js");

    return await renderActiveOrders(chatId);
  },

  help: async ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.help, helpKeyBoard),

  getPrivateKey: async ({ chatId }) => {
    const { promptPrivateKeyConfirmation } = await import(
      "@/functions/index.js"
    );

    return promptPrivateKeyConfirmation(chatId);
  },

  private_key: async ({ chatId }) => {
    const { sendPrivateKey } = await import("@/functions/index.js");

    return sendPrivateKey(chatId);
  },

  buy_crypto: async ({ chatId }) => {
    const { showBuyMenu } = await import("@/functions/index.js");

    return showBuyMenu(userOffsets, chatId);
  },

  sell_crypto: async ({ chatId }) => {
    const { showSellMenu } = await import("@/functions/index.js");

    return showSellMenu(userOffsets, chatId);
  },

  withdrawCrypto: async ({ chatId }) => {
    userState[chatId] = {
      ...userState[chatId],
      step: "waitingForWalletAddress",
    };

    sendMessage(
      chatId,
      `Введiть адресу отримувача
      Увага!
      Адреса має бути у мережi TRON (TRC-20). Вiдправлення на
      iншi блокчейни може призвести до втрати коштiв.
      
      Будь ласка, введiть адресу для виводу:`
    );
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

  active_next: async ({ chatId }) => {
    const total = userOffsets[chatId] ?? 0;

    userOffsets[chatId] = (userOffsets[chatId] ?? 0) + 1;

    if (userOffsets[chatId] >= total) {
      userOffsets[chatId] = total - 1;
    }

    const { renderActiveOrders } = await import("@/functions/index.js");

    return await renderActiveOrders(chatId);
  },

  active_prev: async ({ chatId }) => {
    userOffsets[chatId] = (userOffsets[chatId] ?? 0) - 1;

    if (userOffsets[chatId] < 0) {
      userOffsets[chatId] = 0;
    }

    const { renderActiveOrders } = await import("@/functions/index.js");

    return await renderActiveOrders(chatId);
  },

  pay_method: async ({ chatId }) => {
    const { getPaymentFromDB, payMethod } = await import(
      "@/functions/index.js"
    );

    const savedPayment = await getPaymentFromDB(chatId);

    payMethod({ chatId, savedPayment, userState });
  },

  show_payment_buy_info: async ({ chatId }) => {
    const { showPaymentInfo, notifySellerEscrowStarted } = await import(
      "@/functions/index.js"
    );

    await updateStatusToWaiting(userState, chatId, "sell_requests");
    await notifySellerEscrowStarted(userState, chatId);
    await showPaymentInfo(userState, chatId);
  },

  show_payment_sell_info: async ({ chatId }) => {
    const { sendCryptoTransaction } = await import("@/functions/index.js");

    await updateStatusToWaiting(userState, chatId, "buy_requests");
    await sendCryptoTransaction(chatId);
  },

  add_pay: async ({ chatId }) => {
    const { paymentMethodKeyBoard } = await import("@/exports.js");

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
    const { confirmBuyOrder } = await import("@/functions/index.js");

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
    userState[chatId] = { step: "idle" };

    sendMessage(chatId, "🔙 Главное меню:", mainMenu);
  },
};

export default callbackHandlers;
