import { SendMessageOptions } from "node-telegram-bot-api";

export const payMethodMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "TRX", callback_data: "withdraw_" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
