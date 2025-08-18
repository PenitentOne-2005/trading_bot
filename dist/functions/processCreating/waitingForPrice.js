import { waitingForPriceMenu } from "./menu.js";
import { sendMessage } from "@/functions";
const waitingForPrice = (props) => {
    const { userState, chatId, text } = props;
    const price = parseFloat(text);
    if (isNaN(price) || price <= 0) {
        return sendMessage(chatId, "❌ Введіть коректну ціну.");
    }
    userState[chatId] = {
        ...userState[chatId],
        step: "waitingForPaymentMethod",
        price,
    };
    return sendMessage(chatId, "Виберіть спосіб отримання оплати:", waitingForPriceMenu);
};
export default waitingForPrice;
