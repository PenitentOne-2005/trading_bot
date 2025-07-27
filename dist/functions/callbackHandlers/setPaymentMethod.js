import { setPaymentMethodKeyBoard } from "./menu.js";
import { userState } from "../../userState.js";
import sendMessage from "../sendMessage/sendMessage.js";
const setPaymentMethod = (chatId, method, text) => {
    userState[chatId] = {
        ...userState[chatId],
        step: method === "card" ? "waitingForCard" : "waitingForIBAN",
        paymentMethod: method === "card" ? "Картка" : "IBAN",
    };
    sendMessage(chatId, text, setPaymentMethodKeyBoard);
};
export default setPaymentMethod;
