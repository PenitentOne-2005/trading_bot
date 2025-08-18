import { SendMessageOptions } from "node-telegram-bot-api";

export const waitingForPriceMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Збережений платіжний метод",
          callback_data: "pay_method",
        },
      ],
      [
        {
          text: "Додати новий платіжний метод",
          callback_data: "add_pay",
        },
      ],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};

export const menuBack: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
  },
};

export const backSteps: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Назад", callback_data: "back" }],
      [{ text: "Скасувати", callback_data: "back" }],
    ],
  },
};
