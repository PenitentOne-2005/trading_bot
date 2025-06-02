import { SendMessageOptions } from "node-telegram-bot-api";

export const showOrdersKeyBoard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Купити криптовалюту", callback_data: "buy_crypto" }],
      [{ text: "Продати криптовалюту", callback_data: "sell_crypto" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
