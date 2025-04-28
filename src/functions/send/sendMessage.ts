import bot from "../../botInstance.js";
import { IsendMessage } from "./interface.js";

const sendMessage: IsendMessage = (chatId, text, menu) =>
  bot.sendMessage(chatId, text, menu);

export default sendMessage;
