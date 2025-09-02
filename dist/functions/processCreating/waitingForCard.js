import { checkUserCard } from "./regExp.js";
import { menuBack } from "./menu.js";
import { sendMessage, showSummary, savePayments } from "../../functions/index.js";
const waitingForCard = async (props) => {
    const { userState, chatId, text } = props;
    if (checkUserCard.test(text)) {
        const obj = JSON.stringify({ text });
        userState[chatId] = {
            ...userState[chatId],
            step: "confirmOrder",
            paymentMethod: "Картка",
        };
        await savePayments(chatId, obj);
        return await showSummary(chatId, userState);
    }
    return sendMessage(chatId, "❌ Помилка! Невірний номер картки.\nНомер банківської картки повинен містити рівно 16 цифр без пробілів або символів.\nБудь ласка, введіть коректний номер карти:", menuBack);
};
export default waitingForCard;
