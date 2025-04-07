import bot from "../../botInstance";
import { IsendMessage } from "./interface";

const sendMessage: IsendMessage = (chatId, text, menu) =>
  bot.sendMessage(chatId, text, menu);

export default sendMessage;
