import { menu } from "./menu.js";
import { IconfirmByOrder } from "./interface.js";
import saveRequest from "../saveRequests/saveRequest.js";
import sendMessage from "../sendMessage/sendMessage.js";

const confirmBuyOrder: IconfirmByOrder = async (obj) => {
  const { currentState, userState, chatId, username } = obj;

  const state = currentState;

  if (state?.step === "confirmOrder") {
    const { crypto, amount, price, paymentMethod } = currentState;

    if (!crypto || !amount || !price) {
      return sendMessage(chatId, "❌ Помилка. Неповні дані заявки.");
    }

    await saveRequest("buy", username, crypto, amount, price);

    userState[chatId] = { step: "idle" };

    sendMessage(
      chatId,
      `✅ Ваше оголошення успішно створено!\n\n Оголошення N: 123456 ${amount}\n Криптовалюта: ${crypto}\n Ціна ${price}\n Валюта оплати: UAH\n Спосіб оплати: ${paymentMethod}\n Термін дії: 24 години\n Що далі?`,
      menu
    );
  }
};

export default confirmBuyOrder;
