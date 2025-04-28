import sendMessage from "../send/sendMessage.js";
import { exchangeMenu } from "./commandKeyboard.js";
const createExchange = (msg) => {
    sendMessage(msg.chat.id, "Выберите опцию:", exchangeMenu);
};
export default createExchange;
