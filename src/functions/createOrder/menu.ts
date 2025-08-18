import { SendMessageOptions } from "node-telegram-bot-api";

export const createOrderMenu: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Так, я погоджуюсь", callback_data: "agree_buy" }],
      [{ text: "Назад", callback_data: "back" }],
    ],
  },
};
