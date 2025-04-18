import { Message } from "node-telegram-bot-api";
import { buyCryptoMenu } from "./buyCryptoKeyboard";
import sendMessage from "./sendMessage";

const buyCrypto = async (msg: Message) => {
  sendMessage(msg.chat.id, "Выберите опцию:", buyCryptoMenu);
};

export default buyCrypto;
