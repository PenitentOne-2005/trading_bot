import { menu } from "./menu.js";
import { sendMessage, saveRequest } from "../../functions/index.js";
const confirmBuyOrder = async (obj) => {
    const { userState, chatId, username } = obj;
    const { crypto, amount, price, paymentMethod, orderType } = userState[chatId];
    if (!crypto || !amount || !price) {
        return sendMessage(chatId, "❌ Помилка. Неповні дані заявки.");
    }
    await saveRequest({ orderType, username, chatId, crypto, amount, price });
    userState[chatId] = { step: "idle" };
    return sendMessage(chatId, `✅ Ваше оголошення успішно створено!\n\n Оголошення N: 123456 ${amount}\n Криптовалюта: ${crypto}\n Ціна ${price}\n Валюта оплати: UAH\n Спосіб оплати: ${paymentMethod}\n Термін дії: 24 години\n Що далі?`, menu);
};
export default confirmBuyOrder;
