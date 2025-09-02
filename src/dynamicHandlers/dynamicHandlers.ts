import { Message } from "node-telegram-bot-api";
import { userState, CallbackProps } from "@/exports.js";

const dynamicHandlers: {
  [key: string]: (
    data: string,
    props: CallbackProps
  ) => void | Promise<void | Message>;
} = {
  buy_: async (data, { chatId }) => {
    const { processBuyCryptoSelection } = await import("@/functions/index.js");

    processBuyCryptoSelection(data, chatId, userState);
  },

  withdraw_: async (data, { chatId }) => {
    const { sendMessage } = await import("@/functions/index.js");
    type CryptoKey = "TRX" | "USDT" | "USDC" | "TUSD";

    const crypto = data?.replace("withdraw_", "") as CryptoKey;
    const { balance } = userState[chatId];

    userState[chatId] = {
      ...userState[chatId],
      step: "cryptoWithdraw",
    };

    sendMessage(
      chatId,
      `
      Введiть суму для виводу
      Ваш поточний баланс: ${balance?.[crypto]} ${crypto}
      Мiнiмальний баланс TRX для комiсiй: 1 ${crypto}

      Введiть суму ${crypto}, яку хочете вивести:
      `
    );
  },

  select_order_: async (data, { chatId }) => {
    const { confirmOrderPreview } = await import("@/functions/index.js");

    const orderId = data.replace("select_order_", "");
    const action = userState[chatId]?.currentDb;

    await confirmOrderPreview(action, chatId, orderId);
  },

  agree_get_: async (data, { chatId }) => {
    const { sendMessage, handleConfirmFiat } = await import(
      "@/functions/index.js"
    );

    try {
      const orderId = data.replace("agree_get_", "");

      if (!orderId) {
        return sendMessage(chatId, "❗ orderId не указан.");
      }

      await handleConfirmFiat(chatId, orderId);
    } catch (err) {
      console.error("Ошибка в agree_get_:", err);
      await sendMessage(chatId, "❌ Произошла ошибка при обработке.");
    }
  },
};

export default dynamicHandlers;
