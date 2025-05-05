import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const mainMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "/createWallet" }, { text: "/showBalance" }],
      [{ text: "/createExchange" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
