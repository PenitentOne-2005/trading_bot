import { IAllOrdersMenu } from "./interface.js";
import { showOrdersKeyBoard } from "../callbackHandlers/menu.js";
import sendMessage from "../sendMessage/sendMessage.js";

const allOrdersMenu: IAllOrdersMenu = (chatId) => {
  return sendMessage(
    chatId,
    "Оберіть тип оголошень, які хочете переглянути:",
    showOrdersKeyBoard
  );
};

export default allOrdersMenu;
