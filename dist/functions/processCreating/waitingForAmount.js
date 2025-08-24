import { menuBack } from "./menu.js";
import { sendMessage } from "../../functions/index.js";
const waitingForAmount = (props) => {
    const { userState, currentState, chatId, text } = props;
    const amount = parseFloat(text);
    if (isNaN(amount) || amount <= 0) {
        return sendMessage(chatId, "❌ Введіть коректну суму.");
    }
    userState[chatId] = {
        ...currentState,
        step: "waitingForPrice",
        amount,
    };
    return sendMessage(chatId, `💸 Встановіть ціну в UAH за 1 ${userState[chatId].crypto}:`, menuBack);
};
export default waitingForAmount;
