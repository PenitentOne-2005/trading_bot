import { FuncInfoProps } from "./interface.js";
import { confirmPaymentNotificationKeyBoard } from "./menu.js";
import sendMessage from "../sendMessage/sendMessage.js";

const confirmPaymentNotification: FuncInfoProps = (userState, chatId) => {
  const { orderId, amount, IBAN, Name } = userState[chatId] ?? {};

  const text = `
    Ваше пiдтвердження вiдправки отримано. Очiкуйте на пiдтвердження вiд продавця!
    
    Оголошення #${orderId}
    Сума: ${amount} USDT
    Спосiб оплати: ${IBAN}
    Отримувач: ${Name}
    Статус: Очiкує пiдтвердження вiд продавця
    Продавач отримав повiдомлення про оплату та має пiдтвердити її отримання.
    Що далi? `;

  return sendMessage(chatId, text, confirmPaymentNotificationKeyBoard);
};

export default confirmPaymentNotification;
