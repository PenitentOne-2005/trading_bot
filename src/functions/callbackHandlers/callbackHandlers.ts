import { Message } from "node-telegram-bot-api";
import sendMessage from "../sendMessage/sendMessage.js";
import MESSAGE_TEXT from "../../contentText.js";
import { userOffsets } from "../../userOffsets.js";
import { userState } from "../../userState.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import { mainMenu } from "./mainMenu.js";
import { CallbackProps } from "../../interface.js";
import showOrders from "../showOrders/showOrders.js";
import createOrder from "../create/createOrder.js";
import pool from "../../db.js";

const callbackHandlers: Record<
  string,
  (props: CallbackProps) => void | Promise<Message | void>
> = {
  lang_en: ({ chatId }) =>
    sendMessage(chatId, MESSAGE_TEXT.unsuportLang, selectLanguageBoard),

  lang_ua: async ({ chatId }) => {
    const { agreeKeyBoard } = await import("./agreeKeyBoard.js");

    return sendMessage(chatId, MESSAGE_TEXT.lang, agreeKeyBoard);
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
    const { showOrdersKeyBoard } = await import("./showOrdersKeyBoard.js");

    userOffsets[chatId] = 0;
    return sendMessage(chatId, MESSAGE_TEXT.allOrders, showOrdersKeyBoard);
  },

  myOrders: async ({ chatId }) => {
    const { myOrdersKeyBoard } = await import("./myOrdersKeyBoard.js");

    return sendMessage(chatId, MESSAGE_TEXT.myOrders, myOrdersKeyBoard);
  },

  createOrder: async ({ chatId }) => {
    const { createOrderMenu } = await import("../../createOrderMenu.js");

    return sendMessage(chatId, MESSAGE_TEXT.buyText, createOrderMenu);
  },

  help: async ({ chatId }) => {
    const { helpKeyBoard } = await import("./helpKeyBoard.js");

    return sendMessage(chatId, MESSAGE_TEXT.help, helpKeyBoard);
  },

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

  agree_buy: async ({ chatId, text }) => {
    const handleCryptoSelection = (
      await import("../handleCryptoSelection/handleCryptoSelection.js")
    ).default;

    const CRYPTOS = (await import("../../listCrypto.js")).default;

    if (!text) return;

    return handleCryptoSelection({ chatId, text, CRYPTOS, userState });
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
    const { orderId, amount, sumToPay } = userState[chatId] ?? {};

    const query = `SELECT * FROM payments WHERE id = $1`;
    const result = await pool.query(query, [orderId]);

    if (result.rows.length === 0) {
      console.error("Payment not found");
    }

    const metadata = JSON.parse(result.rows[0].metadata);

    // const text = `Надiшлiть ${sumToPay} UAH продавцю за наступними реквiзитами:\n\n Сума ${amount} USDT переведена в ескроу контракт, що очiкує пiдтвердження отримання оплати вiд продавця.\n Спосiб оплати: IBAN\n Номер IBAN: ${metadata.IBAN}\n Отримувач: ${metadata.name}\n Термiн дiï: 30хв\n Пiдтверждуєте, що надiслали кошти?`;

    const menu = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Так, я надiслав(ла) оплату", callback_data: "agree_sent" }],
          [{ text: "Скасувати", callback_data: "cancel" }],
        ],
      },
    };

    return sendMessage(chatId, `text: ${metadata}`, menu);
  },

  show_payment_sell_info: () => {},

  add_pay: ({ chatId }) => {
    userState[chatId] = {
      ...userState[chatId],
      step: "waitingForPaymentMethod",
    };

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

  card: ({ chatId }) => {
    userState[chatId] = {
      ...userState[chatId],
      step: "waitingForCard",
      paymentMethod: "Картка",
    };

    sendMessage(chatId, "Введіть номер вашої картки (16 цифр):", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Назад", callback_data: "back" }],
          [{ text: "Скасувати", callback_data: "back" }],
        ],
      },
    });
  },

  IBAN: ({ chatId }) => {
    userState[chatId] = {
      ...userState[chatId],
      step: "waitingForIBAN",
      paymentMethod: "IBAN",
    };

    sendMessage(chatId, "Введiть номер IBAN:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Назад", callback_data: "back" }],
          [{ text: "Скасувати", callback_data: "back" }],
        ],
      },
    });
  },

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

  back: ({ chatId }) => {
    userState[chatId] = { step: "idle" };
    sendMessage(chatId, "🔙 Главное меню:", mainMenu);
  },
};

export default callbackHandlers;
