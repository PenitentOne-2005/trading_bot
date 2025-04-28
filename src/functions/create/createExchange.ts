import sendMessage from "../send/sendMessage.js";
import { exchangeMenu } from "./commandKeyboard.js";
import { IcreateExchange } from "./interface.js";

const createExchange: IcreateExchange = (msg) => {
  sendMessage(msg.chat.id, "Выберите опцию:", exchangeMenu);
};

export default createExchange;
