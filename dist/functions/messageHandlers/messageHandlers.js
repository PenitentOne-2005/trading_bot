import MESSAGE_TEXT from "../../contentText.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import sendMessage from "../sendMessage/sendMessage.js";
const createMessageHandlers = (chatId) => {
    return {
        "/start": () => sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
    };
};
export default createMessageHandlers;
// case text === "/next": {
//     userOffsets[chatId] = (userOffsets[chatId] ?? 0) + 1;
//     // return showOrders(userOffsets, chatId);
//   }
