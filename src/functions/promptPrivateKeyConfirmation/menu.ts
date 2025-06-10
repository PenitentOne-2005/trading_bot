import { SendMessageOptions } from "node-telegram-bot-api";

export const menu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💼 Так, я розумію ризики",
          callback_data: "private_key",
        },
      ],
      [{ text: "ℹ️ Скасувати", callback_data: "wallet" }],
    ],
  },
};
