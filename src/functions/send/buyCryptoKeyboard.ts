import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface";

export const buyCryptoMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "/showOrders" }, { text: "/createOrder" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
