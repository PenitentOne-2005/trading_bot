import { payMethodProps } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";
import showSummary from "../showSummary/showSummary.js";

const payMethod: payMethodProps = (props) => {
  const { chatId, savedPayment, userState } = props;

  if (savedPayment) {
    userState[chatId] = {
      ...userState[chatId],
      paymentMethod: savedPayment,
    };

    return showSummary(chatId, userState);
  }

  userState[chatId] = {
    ...userState[chatId],
    step: "waitingForPaymentMethod",
  };

  return sendMessage(
    chatId,
    "У вас ще не збережено платіжний метод. Будь ласка, додайте:",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Банківська карта", callback_data: "card" }],
          [{ text: "Банківський рахунок (IBAN)", callback_data: "IBAN" }],
          [{ text: "Назад", callback_data: "back" }],
        ],
      },
    }
  );
};

export default payMethod;
