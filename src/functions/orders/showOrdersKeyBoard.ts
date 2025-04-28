import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const ordersMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "/buy" }, { text: "/next" }] as MenuButton[],
      [{ text: "/back" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
