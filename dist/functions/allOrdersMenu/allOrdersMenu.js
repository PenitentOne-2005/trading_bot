import { showOrdersKeyBoard } from "../../exports.js";
import { sendMessage } from "../../functions/index.js";
const allOrdersMenu = (chatId) => {
    return sendMessage(chatId, "Оберіть тип оголошень, які хочете переглянути:", showOrdersKeyBoard);
};
export default allOrdersMenu;
