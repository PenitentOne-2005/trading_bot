import { sendMessage, stepHandlers } from "../functions/index.js";
import { selectLanguageBoard, userState, MESSAGE_TEXT, createMessageHandlers, } from "../exports.js";
const greetings = process.env.GREETINGS;
if (!greetings) {
    console.error("❌ GREETINGS не найден! Убедитесь, что он задан в .env файле.");
    process.exit(1);
}
const processUserMessage = async (msg) => {
    const { chat, text } = msg;
    const chatId = chat.id;
    if (!text)
        return;
    const currentState = userState[chatId];
    if (currentState?.step) {
        const handler = stepHandlers[currentState.step];
        if (handler) {
            return handler({ userState, currentState, chatId, text });
        }
        userState[chatId] = { step: "idle" };
        return sendMessage(chatId, "⚠️ Невідомий крок. Скиньте, будь ласка, команду ще раз.");
    }
    if (text === "/start") {
        sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard);
        userState[chatId] = { step: "idle" };
        return;
    }
    const handlers = createMessageHandlers(chatId);
    return text in handlers
        ? await handlers[text]()
        : sendMessage(chatId, "Невідома команда.");
};
export default processUserMessage;
