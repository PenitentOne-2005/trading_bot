import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const agreeKeyBoard: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "Погоджуюсь" }] as MenuButton[],
      [{ text: "Не погоджуюсь" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
