import { SendMessageOptions } from "node-telegram-bot-api";

export const mainMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "💼 Гаманець", callback_data: "wallet" }],
      [{ text: "📃 Всі оголошення", callback_data: "allOrders" }],
      [{ text: "📌 Мої оголошення", callback_data: "myOrders" }],
      [{ text: "✏️ Створити оголошення", callback_data: "createOrder" }],
      [{ text: "ℹ️ Допомога", callback_data: "help" }],
    ],
  },
};
