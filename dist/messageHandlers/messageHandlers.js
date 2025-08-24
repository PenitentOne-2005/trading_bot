import { selectLanguageBoard, MESSAGE_TEXT } from "../exports.js";
import { sendMessage } from "../functions";
const createMessageHandlers = (chatId) => {
    return {
        "/start": () => sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
    };
};
export default createMessageHandlers;
