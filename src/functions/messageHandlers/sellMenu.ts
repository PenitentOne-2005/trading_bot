import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const sellMenu: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "TRX" }] as MenuButton[],
      [{ text: "USDT" }] as MenuButton[],
      [{ text: "Назад" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};
