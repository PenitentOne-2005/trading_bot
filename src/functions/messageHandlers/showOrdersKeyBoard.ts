import { SendMessageOptions } from "node-telegram-bot-api";
import { MenuButton } from "../../interface.js";

export const showOrdersKeyBoard: SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: "Купити криптовалюту" }] as MenuButton[],
      [{ text: "Продати криптовалюту" }] as MenuButton[],
      [{ text: "Назад" }] as MenuButton[],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};
