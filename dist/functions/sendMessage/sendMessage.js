import bot from "@/botInstance.js";
const sendMessage = (chatId, text, menu) => bot.sendMessage(chatId, text, menu);
export default sendMessage;
