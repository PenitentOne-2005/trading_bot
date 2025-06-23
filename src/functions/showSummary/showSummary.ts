import sendMessage from "../sendMessage/sendMessage.js";
import { IshowSummary } from "./interface.js";
import menu from "./menu.js";

const showSummary: IshowSummary = async (chatId, userState) => {
  userState[chatId] = {
    ...userState[chatId],
    step: "confirmOrder",
  };

  const { crypto, price, paymentMethod } = userState[chatId];

  return sendMessage(
    chatId,
    `📦 Перегляд оголошення\n\n` +
      `🔸 Оголошення N: 123456\n` +
      `🔸 Криптовалюта: ${crypto}\n` +
      `🔸 Ціна: ${price} UAH за 1 ${crypto}\n` +
      `🔸 Валюта оплати: UAH\n` +
      `🔸 Спосіб оплати: ${paymentMethod} \n` +
      `🔸 Термін дії: 24 години \n` +
      `✅ Все вірно?`,
    menu
  );
};

export default showSummary;
