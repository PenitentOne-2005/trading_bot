import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const buyCryptoKeyboard: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "/showOrders" }, { text: "/createOrder" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
