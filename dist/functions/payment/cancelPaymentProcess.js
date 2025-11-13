import { pool, cancelPaymentProcessKeyBoard } from "../../exports.js";
import { sendMessage } from "../../functions/index.js";
const cancelPaymentProcess = async (userState, chatId, orderId) => {
    try {
        const { amount, sumToPay, crypto, currentDb, orderType } = userState[chatId] ?? {};
        const action = orderType === "buy" ? "покупку" : "продаж";
        const updateQuery = `
        UPDATE ${currentDb}
        SET status = 'active',
            buyer_chat_id = NULL
        WHERE id = $1 AND buyer_chat_id = $2
      `;
        await pool.query(updateQuery, [orderId, chatId]);
        const text = `❌ Операцiю скасовано!
    Ви скасували ${action} ${amount} ${crypto} за ${sumToPay} UAH.
    Оголошення #${orderId} залишилось активним, i ви можете використати його пiзнiше.
    Що далi?`;
        return sendMessage(chatId, text, cancelPaymentProcessKeyBoard);
    }
    catch (error) {
        console.error("❌ Помилка при скасуванні оплати:", error);
        return sendMessage(chatId, "❌ Не вдалося скасувати оплату.");
    }
};
export default cancelPaymentProcess;
