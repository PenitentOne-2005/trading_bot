import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface";

export const exchangeMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "/sellCrypto" }, { text: "/buyCrypto" }] as MenuButton[],
      [{ text: "/back" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};
