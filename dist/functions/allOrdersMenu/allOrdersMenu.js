import sendMessage from "../sendMessage/sendMessage.js";
import { showOrdersKeyBoard } from "../messageHandlers/showOrdersKeyBoard.js";
const allOrdersMenu = async (chatId) => {
    await sendMessage(chatId, "Оберіть тип оголошень, які хочете переглянути:", showOrdersKeyBoard);
};
export default allOrdersMenu;
