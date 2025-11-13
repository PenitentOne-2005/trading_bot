import menu from "./menu.js";
import { sendMessage } from "../../functions/index.js";
const showSummary = async (chatId, userState) => {
    const { crypto, price, paymentMethod } = userState[chatId];
    return sendMessage(chatId, `📦 Перегляд оголошення\n\n` +
        `🔸 Оголошення N: 123456\n` +
        `🔸 Криптовалюта: ${crypto}\n` +
        `🔸 Ціна: ${price} UAH за 1 ${crypto}\n` +
        `🔸 Валюта оплати: UAH\n` +
        `🔸 Спосіб оплати: ${paymentMethod} \n` +
        `🔸 Термін дії: 24 години \n` +
        `✅ Все вірно?`, menu);
};
export default showSummary;
