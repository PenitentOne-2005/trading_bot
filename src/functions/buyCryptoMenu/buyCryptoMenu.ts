import { Message } from "node-telegram-bot-api";
import { buyCryptoKeyboard } from "./buyCryptoKeyboard.js";
import sendMessage from "../sendMessage/sendMessage.js";

const buyCryptoMenu = (msg: Message) => {
  return sendMessage(msg.chat.id, "Выберите опцию:", buyCryptoKeyboard);
};

export default buyCryptoMenu;
