import { SendMessageOptions } from "node-telegram-bot-api";

export const createOrderMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Купити криптовалюту", callback_data: "create_buy_crypto" }],
      [{ text: "Продати криптовалюту", callback_data: "create_sell_crypto" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
