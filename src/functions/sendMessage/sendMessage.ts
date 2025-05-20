import { ISendMessage } from "./interface.js";
import bot from "../../botInstance.js";

const sendMessage: ISendMessage = (chatId, text, menu) =>
  bot.sendMessage(chatId, text, menu);

export default sendMessage;
