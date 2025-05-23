import { SendMessageOptions } from "node-telegram-bot-api";

export const sellMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "TRX", callback_data: "sell_trx" }],
      [{ text: "USDT", callback_data: "sell_usdt" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
