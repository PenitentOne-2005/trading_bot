import dotenv from "dotenv";
dotenv.config({ path: "/root/trading_bot/.env" });
import sendMessage from "../send/sendMessage.js";
import { mainMenu } from "../../commandKeyboard.js";
const greetings = process.env.GREETINGS;
if (!greetings) {
    console.error("❌ GREETINGS не найден! Убедитесь, что он задан в .env файле.");
    process.exit(1);
}
const greetingsMessage = (msg) => {
    const chatId = msg.chat.id;
    sendMessage(chatId, greetings, mainMenu);
};
export default greetingsMessage;
