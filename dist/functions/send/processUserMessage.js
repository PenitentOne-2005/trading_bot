import { userState } from "../../userState.js";
import showOrders from "../orders/showOrders.js";
import { userOffsets } from "../orders/userOffsets.js";
import saveSellRequest from "../save/saveSellRequest.js";
import { mainMenu } from "./commandKeyboard.js";
import sendMessage from "./sendMessage.js";
const CRYPTOS = ["TRX", "USDT"];
const processUserMessage = async (msg) => {
    const { chat, text } = msg;
    const chatId = chat.id;
    const username = chat.username;
    if (!username || !text)
        return;
    const currentState = userState[chatId] ?? { step: "idle" };
    switch (true) {
        case currentState.step === "waitingForCrypto": {
            if (!CRYPTOS.includes(text)) {
                return sendMessage(chatId, "❌ Пожалуйста, выбери криптовалюту кнопкой.");
            }
            userState[chatId] = { step: "waitingForAmount", crypto: text };
            return sendMessage(chatId, `💰 Введи сумму ${text}, которую хочешь продать:`);
        }
        case currentState.step === "waitingForAmount": {
            const amount = parseFloat(text);
            if (isNaN(amount) || amount <= 0) {
                return sendMessage(chatId, "❌ Введи корректную сумму.");
            }
            await saveSellRequest(username, currentState.crypto, amount);
            await sendMessage(chatId, `✅ Заявка на продажу ${amount} ${currentState.crypto} создана!\nКак только заявка будет обработана, ты получишь уведомление!`);
            userState[chatId] = { step: "idle" };
            return sendMessage(chatId, "🔙 Главное меню:", mainMenu);
        }
        case text === "/sellCrypto": {
            userState[chatId] = { step: "waitingForCrypto" };
            return sendMessage(chatId, "🪙 Выбери криптовалюту для продажи:", {
                reply_markup: {
                    keyboard: [[{ text: "TRX" }, { text: "USDT" }], [{ text: "/back" }]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        }
        case text === "/back": {
            userState[chatId] = { step: "idle" };
            return sendMessage(chatId, "🔙 Главное меню:", mainMenu);
        }
        case text === "/showOrders": {
            userOffsets[chatId] = 0;
            return sendMessage(chatId, "Заявки:");
        }
        case text === "/next": {
            userOffsets[chatId] = (userOffsets[chatId] ?? 0) + 1;
            return showOrders(msg);
        }
        case !text.startsWith("/"): {
            return sendMessage(chatId, `Ты написал: ${text}`);
        }
        default:
            break;
    }
};
export default processUserMessage;
