import dotenv from "dotenv";
dotenv.config({ path: "/root/trading_bot/.env" });
import sendMessage from "../send/sendMessage.js";
const greetings = process.env.GREETINGS;
if (!greetings) {
    console.error("❌ GREETINGS не найден! Убедитесь, что он задан в .env файле.");
    process.exit(1);
}
const greetingsMessage = (msg) => {
    sendMessage(msg.chat.id, greetings, {
        reply_markup: {
            keyboard: [
                [{ text: "/createWallet" }, { text: "/showBalance" }],
                [{ text: "/createExchange" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
        },
    });
};
export default greetingsMessage;
