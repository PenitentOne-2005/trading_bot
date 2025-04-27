import bot from "../../botInstance";
const sendMessage = (chatId, text, menu) => bot.sendMessage(chatId, text, menu);
export default sendMessage;
