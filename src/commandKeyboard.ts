import { SendMessageOptions } from "node-telegram-bot-api";

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
