import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "./interface";

export const mainMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "Гаманець" }] as MenuButton[],
      [{ text: "Всі оголошення" }] as MenuButton[],
      [{ text: "Мої оголошення" }] as MenuButton[],
      [{ text: "Створити оголошення" }] as MenuButton[],
      [{ text: "Допомога" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
