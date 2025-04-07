import sendMessage from "../send/sendMessage";
import { exchangeMenu } from "./commandKeyboard";
import { IcreateExchange } from "./interface";

const createExchange: IcreateExchange = (msg) => {
  sendMessage(msg.chat.id, "Выберите опцию:", exchangeMenu);
};

export default createExchange;
