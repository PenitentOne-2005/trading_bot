import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const helpKeyBoard: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "Всі оголошення" }] as MenuButton[],
      [{ text: "Гаманець" }] as MenuButton[],
      [{ text: "Назад" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
