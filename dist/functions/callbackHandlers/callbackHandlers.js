import sendMessage from "../sendMessage/sendMessage.js";
import CRYPTOS from "../../listCrypto.js";
import MESSAGE_TEXT from "../../contentText.js";
import { userOffsets } from "../../userOffsets.js";
import handleCryptoSelection from "../handleCryptoSelection/handleCryptoSelection.js";
import showSummary from "../showSummary/showSummary.js";
import confirmBuyOrder from "../confirmBuyOrder/confirmBuyOrder.js";
import { userState } from "../../userState.js";
import showBuyMenu from "../showBuyMenu/showBuyMenu.js";
import showSellMenu from "../showSellMenu/showSellMenu.js";
import createBuyOrder from "../create/createBuyOrder.js";
import createSellOrder from "../create/createSellOrder.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import { agreeKeyBoard } from "./agreeKeyBoard.js";
import { mainMenu } from "./mainMenu.js";
import { showOrdersKeyBoard } from "./showOrdersKeyBoard.js";
import { myOrdersKeyBoard } from "./myOrdersKeyBoard.js";
import { createOrderMenu } from "../../createOrderMenu.js";
import { helpKeyBoard } from "./helpKeyBoard.js";
const callbackHandlers = {
    // 🌐 Выбор языка
    lang_en: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.unsuportLang, selectLanguageBoard),
    lang_ua: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.lang, agreeKeyBoard),
    // ✅ Согласие
    agree_yes: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.greetings, mainMenu),
    agree_no: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard),
    // 📂 Головне меню
    wallet: ({ chatId }) => sendMessage(chatId, "💼 Ваш гаманець:"),
    allOrders: ({ chatId }) => {
        userOffsets[chatId] = 0;
        sendMessage(chatId, MESSAGE_TEXT.allOrders, showOrdersKeyBoard);
    },
    myOrders: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.myOrders, myOrdersKeyBoard),
    createOrder: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.buyText, createOrderMenu),
    help: ({ chatId }) => sendMessage(chatId, MESSAGE_TEXT.help, helpKeyBoard),
    // 💰 Покупка / Продажа
    buy_crypto: ({ chatId }) => showBuyMenu(userOffsets, chatId),
    sell_crypto: ({ chatId }) => showSellMenu(userOffsets, chatId),
    create_buy_crypto: createBuyOrder,
    create_sell_crypto: createSellOrder,
    agree_buy: ({ chatId, text }) => {
        if (!text)
            return;
        handleCryptoSelection({ chatId, text, CRYPTOS, userState });
    },
    pay_method: ({ chatId }) => {
        const currentState = userState[chatId];
        showSummary(chatId, userState, currentState);
    },
    confirm_buy_order: ({ chatId, username }) => {
        if (!username)
            return;
        const currentState = userState[chatId];
        confirmBuyOrder({ chatId, username, currentState, userState });
    },
    back: async ({ chatId }) => {
        userState[chatId] = { step: "idle" };
        sendMessage(chatId, "🔙 Главное меню:", mainMenu);
    },
};
export default callbackHandlers;
