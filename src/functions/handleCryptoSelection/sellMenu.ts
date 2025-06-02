import { SendMessageOptions } from "node-telegram-bot-api";

export const sellMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "USDT (TRC-20)", callback_data: "buy_USDT" }],
      [{ text: "USDC (TRC-20)", callback_data: "buy_USDC" }],
      [{ text: "TUSD (TRC-20)", callback_data: "buy_TUSD" }],
      [{ text: "DAI (TRC-20)", callback_data: "buy_DAI" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
