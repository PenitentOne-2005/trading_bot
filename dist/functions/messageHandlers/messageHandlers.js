import MESSAGE_TEXT from "./contentText.js";
import { mainMenu } from "../../commandKeyboard.js";
import { selectLanguageBoard } from "./selectLanguageBoard.js";
import showSellMenu from "../showSellMenu/showSellMenu.js";
import { userOffsets } from "../../userOffsets.js";
import showBuyMenu from "../showBuyMenu/showBuyMenu.js";
import { agreeKeyBoard } from "./agreeKeyBoard.js";
import { helpKeyBoard } from "./helpKeyBoard.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { showOrdersKeyBoard } from "./showOrdersKeyBoard.js";
import { userState } from "../../userState.js";
import { sellMenu } from "./sellMenu.js";
import { myOrdersKeyBoard } from "./myOrdersKeyBoard.js";
const createMessageHandlers = (chatId) => {
    return {
        "I speak English": () => sendMessage(chatId, MESSAGE_TEXT.unsuportLang, selectLanguageBoard),
        "Я розмовляю українською": () => sendMessage(chatId, MESSAGE_TEXT.lang, agreeKeyBoard),
        "Не погоджуюсь": () => sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
        Погоджуюсь: () => sendMessage(chatId, MESSAGE_TEXT.greetings, mainMenu),
        Start: () => sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
        "/start": () => sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
        Допомога: () => sendMessage(chatId, MESSAGE_TEXT.help, helpKeyBoard),
        "Всі оголошення": async () => {
            userOffsets[chatId] = 0;
            await sendMessage(chatId, MESSAGE_TEXT.allOrders, showOrdersKeyBoard);
        },
        "Купити криптовалюту": () => showBuyMenu(userOffsets, chatId),
        "Продати криптовалюту": () => showSellMenu(userOffsets, chatId),
        Назад: () => {
            userState[chatId] = { step: "idle" };
            return sendMessage(chatId, "🔙 Главное меню:", mainMenu);
        },
        "Створити оголошення": () => {
            userState[chatId] = { step: "waitingForCrypto" };
            return sendMessage(chatId, MESSAGE_TEXT.buyText, sellMenu);
        },
        "Моі оголошення": () => {
            return sendMessage(chatId, MESSAGE_TEXT.myOrders, myOrdersKeyBoard);
        },
    };
};
export default createMessageHandlers;
// case text === "/next": {
//     userOffsets[chatId] = (userOffsets[chatId] ?? 0) + 1;
//     // return showOrders(userOffsets, chatId);
//   }
