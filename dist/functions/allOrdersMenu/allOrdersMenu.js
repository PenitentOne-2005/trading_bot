import { showOrdersKeyBoard } from "../callbackHandlers/menu.js";
import sendMessage from "../sendMessage/sendMessage.js";
const allOrdersMenu = (chatId) => {
    return sendMessage(chatId, "Оберіть тип оголошень, які хочете переглянути:", showOrdersKeyBoard);
};
export default allOrdersMenu;
