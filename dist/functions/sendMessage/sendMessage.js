import { bot } from "@/exports.js";
const sendMessage = (chatId, text, menu) => bot.sendMessage(chatId, text, menu);
export default sendMessage;
