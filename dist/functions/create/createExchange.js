import sendMessage from "../send/sendMessage";
import { exchangeMenu } from "./commandKeyboard";
const createExchange = (msg) => {
    sendMessage(msg.chat.id, "Выберите опцию:", exchangeMenu);
};
export default createExchange;
