import { SendMessageOptions } from "node-telegram-bot-api";

export const menu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💼 Повернутися до гаманця",
          callback_data: "wallet",
        },
      ],
      [{ text: "ℹ️ Переглянути оголошення", callback_data: "allOrders" }],
    ],
  },
};
