import sendMessage from "../sendMessage/sendMessage.js";
import { exchangeMenuKeyBoard } from "./exchangeMenuKeyBoard.js";
const createExchangeMenu = (msg) => {
    sendMessage(msg.chat.id, "Выберите опцию:", exchangeMenuKeyBoard);
};
export default createExchangeMenu;
