import sendMessage from "../sendMessage/sendMessage.js";
import { showOrdersKeyBoard } from "../callbackHandlers/showOrdersKeyBoard.js";
const allOrdersMenu = async (chatId) => {
    await sendMessage(chatId, "Оберіть тип оголошень, які хочете переглянути:", showOrdersKeyBoard);
};
export default allOrdersMenu;
