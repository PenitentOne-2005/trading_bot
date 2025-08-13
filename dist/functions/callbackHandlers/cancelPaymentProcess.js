import pool from "../../db.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { cancelPaymentProcessKeyBoard } from "./menu.js";
const cancelPaymentProcess = async (userState, chatId, orderId) => {
    try {
        const { amount, sumToPay, crypto, currentDb } = userState[chatId] ?? {};
        const updateQuery = `
        UPDATE ${currentDb}
        SET status = 'active',
            buyer_chat_id = NULL
        WHERE id = $1 AND buyer_chat_id = $2
      `;
        await pool.query(updateQuery, [orderId, chatId]);
        const text = `❌ Операцiю скасовано!\n Ви скасували покупку ${amount} ${crypto} за ${sumToPay} UAH.\n Оголошення #${orderId} залишилось активним, i ви можете використати його пiзнiше.\n Що далi?`;
        return sendMessage(chatId, text, cancelPaymentProcessKeyBoard);
    }
    catch (error) {
        console.error("❌ Помилка при скасуванні оплати:", error);
        return sendMessage(chatId, "❌ Не вдалося скасувати оплату.");
    }
};
export default cancelPaymentProcess;
