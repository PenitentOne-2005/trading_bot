import { IAllOrdersMenu } from "./interface.js";
import { showOrdersKeyBoard } from "@/exports.js";
import { sendMessage } from "@/functions";

const allOrdersMenu: IAllOrdersMenu = (chatId) => {
  return sendMessage(
    chatId,
    "Оберіть тип оголошень, які хочете переглянути:",
    showOrdersKeyBoard
  );
};

export default allOrdersMenu;
