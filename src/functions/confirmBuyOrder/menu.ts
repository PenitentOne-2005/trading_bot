import { SendMessageOptions } from "node-telegram-bot-api";

export const menu: SendMessageOptions = {
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
};
