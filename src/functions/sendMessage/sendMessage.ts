import bot from "@/botInstance.js";
import { ISendMessage } from "./interface.js";

const sendMessage: ISendMessage = (chatId, text, menu) =>
  bot.sendMessage(chatId, text, menu);

export default sendMessage;
