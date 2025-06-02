import { SendMessageOptions } from "node-telegram-bot-api";

export const agreeKeyBoard: SendMessageOptions = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Погоджуюсь", callback_data: "agree_yes" }],
      [{ text: "Не погоджуюсь", callback_data: "agree_no" }],
    ],
  },
};
