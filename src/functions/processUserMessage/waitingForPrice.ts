import sendMessage from "../sendMessage/sendMessage.js";
import { IWaitingForPrice } from "./interface.js";

const waitingForPrice: IWaitingForPrice = (props) => {
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

  return sendMessage(chatId, "Виберіть спосіб отримання оплати:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Збережений платіжний метод",
            callback_data: "pay_method",
          },
        ],
        [
          {
            text: "Додати новий платіжний метод",
            callback_data: "add_pay",
          },
        ],
        [{ text: "Назад", callback_data: "back" }],
      ],
    },
  });
};

export default waitingForPrice;
