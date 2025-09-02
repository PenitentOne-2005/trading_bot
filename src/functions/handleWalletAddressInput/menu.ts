import { SendMessageOptions } from "node-telegram-bot-api";

export const menu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "TRX", callback_data: "withdraw_TRX" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
