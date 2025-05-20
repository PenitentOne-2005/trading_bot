import sendMessage from "../sendMessage/sendMessage.js";
import saveRequest from "../saveRequests/saveRequest.js";
const createSellOrder = async (props) => {
    const { currentState, CRYPTOS, text, chatId, userState, username, mainMenu } = props;
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
            return sendMessage(chatId, `💸 Введи цену за 1 ${currentState.crypto}:`);
        }
        case currentState.step === "waitingForPrice": {
            const price = parseFloat(text);
            if (isNaN(price) || price <= 0) {
                return sendMessage(chatId, "❌ Введи корректную цену.");
            }
            await saveRequest("sell", username, currentState.crypto, currentState.amount, price);
            await sendMessage(chatId, `✅ Заявка на продажу ${currentState.amount} ${currentState.crypto} создана!\nКак только заявка будет обработана, ты получишь уведомление!`);
            userState[chatId] = { step: "idle" };
            return sendMessage(chatId, "🔙 Главное меню:", mainMenu);
        }
        default:
            break;
    }
};
export default createSellOrder;
