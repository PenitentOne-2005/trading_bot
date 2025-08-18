import { SetPaymentMethod } from "./interface.js";
import { setPaymentMethodKeyBoard, userState } from "@/exports.js";
import { sendMessage } from "@/functions";

const setPaymentMethod: SetPaymentMethod = (chatId, method, text) => {
  userState[chatId] = {
    ...userState[chatId],
    step: method === "card" ? "waitingForCard" : "waitingForIBAN",
    paymentMethod: method === "card" ? "Картка" : "IBAN",
  };

  sendMessage(chatId, text, setPaymentMethodKeyBoard);
};

export default setPaymentMethod;
