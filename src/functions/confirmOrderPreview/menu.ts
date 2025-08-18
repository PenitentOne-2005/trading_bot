import { SendMessageOptions } from "node-telegram-bot-api";

export const showPaymentSell: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Так, підтверджую",
          callback_data: "show_payment_sell_info",
        },
      ],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};

export const showPaymentBuy: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Так, переглянути реквiзити для оплати",
          callback_data: "show_payment_buy_info",
        },
      ],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
