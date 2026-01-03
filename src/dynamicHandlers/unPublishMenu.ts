import { SendMessageOptions } from "node-telegram-bot-api";

export const unPublishMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Мої оголошення", callback_data: "myOrders" }],
      [{ text: "Всі оголошення", callback_data: "allOrders" }],
      [{ text: "Гаманець", callback_data: "wallet" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
