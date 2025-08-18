import { payMethodProps } from "./interface.js";
import { payMethodMenu } from "./menu.js";
import { sendMessage, showSummary } from "@/functions";

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
    payMethodMenu
  );
};

export default payMethod;
