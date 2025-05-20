import { IAllOrdersMenu } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { showOrdersKeyBoard } from "../messageHandlers/showOrdersKeyBoard.js";

const allOrdersMenu: IAllOrdersMenu = async (chatId) => {
  await sendMessage(
    chatId,
    "Оберіть тип оголошень, які хочете переглянути:",
    showOrdersKeyBoard
  );
};

export default allOrdersMenu;
