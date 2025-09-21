import { initMenu } from "./interface.js";

const initMenu: initMenu = (tokenButtons) => {
  return {
    reply_markup: {
      inline_keyboard: [
        ...tokenButtons.map((btn) => [btn]),
        [{ text: "Назад", callback_data: "back" }],
      ],
    },
  };
};

export default initMenu;
