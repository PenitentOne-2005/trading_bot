import { SendMessageOptions } from "node-telegram-bot-api";

export const menu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "📃 Перейти до оголошень", callback_data: "wallet" }],
      [{ text: "Вивести криптовалюту", callback_data: "allOrders" }],
      [{ text: "Редагувати платіжні методи", callback_data: "myOrders" }],
      [
        {
          text: "✏️ Експортувати приватний ключ",
          callback_data: "getPrivateKey",
        },
      ],
      [{ text: "ℹ️ Назад", callback_data: "back" }],
    ],
  },
};
