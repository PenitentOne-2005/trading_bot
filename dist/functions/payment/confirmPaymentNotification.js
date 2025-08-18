import { confirmPaymentNotificationKeyBoard, dataMap } from "@/exports.js";
import { sendMessage } from "@/functions";
const confirmPaymentNotification = (userState, chatId) => {
    const { orderId, amount, IBAN, Name } = userState[chatId || dataMap.get("second_user_chat_id")] ?? {};
    const text = `
    Ваше пiдтвердження вiдправки отримано!
    
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
