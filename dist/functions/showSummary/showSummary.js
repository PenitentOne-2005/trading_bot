import sendMessage from "../sendMessage/sendMessage.js";
import menu from "./menu.js";
const showSummary = async (chatId, userState) => {
    const currentState = userState[chatId];
    if (!currentState)
        return;
    const { crypto, amount, paymentMethod } = currentState;
    return sendMessage(chatId, `📦 Перегляд оголошення\n\n` +
        `🔸 Оголошення N: 123456\n` +
        `🔸 Криптовалюта: ${crypto}\n` +
        `🔸 Ціна: ${amount} UAH за 1 ${crypto}\n` +
        `🔸 Валюта оплати: UAH\n` +
        `🔸 Спосіб оплати: ${paymentMethod} \n` +
        `🔸 Термін дії: 24 години \n` +
        `✅ Все вірно?`, menu);
};
export default showSummary;
