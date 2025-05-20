import sendMessage from "../sendMessage/sendMessage.js";
import { exchangeMenuKeyBoard } from "./exchangeMenuKeyBoard.js";
import { ICreateExchange } from "./interface.js";

const createExchangeMenu: ICreateExchange = (msg) => {
  sendMessage(msg.chat.id, "Выберите опцию:", exchangeMenuKeyBoard);
};

export default createExchangeMenu;
