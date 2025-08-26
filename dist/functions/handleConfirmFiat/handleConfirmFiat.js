import { pool, userState, agreeGetKeyBoard } from "../../exports.js";
import { sendMessage } from "../../functions/index.js";
import { handleConfirmFiatMenu } from "./menu.js";
const handleConfirmFiat = async (chatId, orderId) => {
    try {
        const { currentDb } = userState[chatId] ?? {};
        const sellerQuery = `
    SELECT buyer_chat_id, amount, price, crypto
    FROM ${currentDb}
    WHERE id = $1
  `;
        const sellerResult = await pool.query(sellerQuery, [orderId]);
        if (sellerResult.rows.length === 0) {
            return sendMessage(chatId, "❌ Ордер не найден.");
        }
        const { buyer_chat_id, amount, price, crypto } = sellerResult.rows[0];
        const sumToPay = amount * price;
        // Сообщение покупателю
        await sendMessage(buyer_chat_id, `✅ Успiшно! Продавец пiдтвердив отримання фiатного платежу.

        Оголошення #${orderId}
        Куплено: ${amount}
        Сума: ${sumToPay}
        Комісія за послугу: 1 ${crypto} (0.5%)
        Статус: Завершено
        Кошти успiшно переведенi на ваш гаманець!
        Що далi?`, handleConfirmFiatMenu);
        // Сообщение продавцу
        await sendMessage(chatId, `Успiшно! Ескроу-контракт вiдправив криптовалюту покупцевi.
    
     Оголошення #${orderId}
     Продано: ${amount} ${crypto}
     Сума: ${sumToPay}
     Комiсiя за послугу: 1 ${crypto} (0.5%)
     Статус: Завершено
     Що далi?`, agreeGetKeyBoard);
    }
    catch (error) {
        await sendMessage(chatId, "❌ Произошла ошибка при подтверждении.");
    }
};
export default handleConfirmFiat;
