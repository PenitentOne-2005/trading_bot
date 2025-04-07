import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface";

export const mainMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "/createWallet" }, { text: "/showBalance" }] as MenuButton[],
      [{ text: "/createExchange" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
