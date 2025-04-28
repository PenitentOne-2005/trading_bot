import { Message } from "node-telegram-bot-api";
import { buyCryptoMenu } from "./buyCryptoKeyboard.js";
import sendMessage from "./sendMessage.js";

const buyCrypto = async (msg: Message) => {
  sendMessage(msg.chat.id, "Выберите опцию:", buyCryptoMenu);
};

export default buyCrypto;
