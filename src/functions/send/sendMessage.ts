import bot from "../../botInstance";
import { IsendMessage } from "./interface";

const sendMessage: IsendMessage = (chatId, text) =>
  bot.sendMessage(chatId, text);

export default sendMessage;
