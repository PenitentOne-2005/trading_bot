import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const myOrdersKeyBoard: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "Очікують реакції" }] as MenuButton[],
      [{ text: "Активні оголошення" }] as MenuButton[],
      [{ text: "Завершені" }] as MenuButton[],
      [{ text: "Створити оголошення" }] as MenuButton[],
      [{ text: "Назад" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
