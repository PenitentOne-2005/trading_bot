import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface";

export const selectLanguageBoard: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "I speak English" }] as MenuButton[],
      [{ text: "Я розмовляю українською" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
