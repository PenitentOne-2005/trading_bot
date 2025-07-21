import { menu } from "./menu.js";
import { IconfirmByOrder } from "./interface.js";
import saveRequest from "../saveRequests/saveRequest.js";
import sendMessage from "../sendMessage/sendMessage.js";

const confirmBuyOrder: IconfirmByOrder = async (obj) => {
  const { userState, chatId, username } = obj;

  const state = userState[chatId];

  // if (state?.step !== "confirmOrder") {
  //   return sendMessage(chatId, "⚠️ Неочікуваний стан. Спробуйте ще раз.");
  // }

  const { crypto, amount, price, paymentMethod, orderType } = state;

  if (!crypto || !amount || !price) {
    return sendMessage(chatId, "❌ Помилка. Неповні дані заявки.");
  }

  await saveRequest(orderType, username, crypto, amount, price);

  userState[chatId] = { step: "idle" };

  return sendMessage(
    chatId,
    `✅ Ваше оголошення успішно створено!\n\n Оголошення N: 123456 ${amount}\n Криптовалюта: ${crypto}\n Ціна ${price}\n Валюта оплати: UAH\n Спосіб оплати: ${paymentMethod}\n Термін дії: 24 години\n Що далі?`,
    menu
  );
};

export default confirmBuyOrder;
