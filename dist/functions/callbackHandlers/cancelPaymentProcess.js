import pool from "../../db.js";
import sendMessage from "../sendMessage/sendMessage.js";
const cancelPaymentProcess = async (chatId, orderId, userState) => {
    try {
        const updateQuery = `
        UPDATE buy_requests
        SET status = 'active',
            buyer_chat_id = NULL
        WHERE id = $1 AND buyer_chat_id = $2
      `;
        await pool.query(updateQuery, [orderId, chatId]);
        const { amount, sumToPay, crypto } = userState[chatId] ?? {};
        const text = `❌ Операцiю скасовано!\n Ви скасували покупку ${amount} ${crypto} за ${sumToPay} UAH.\n Оголошення #${orderId} залишилось активним, i ви можете використати його пiзнiше.\n Що далi?`;
        const menu = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "📃 Переглянути iншi оголошення",
                            callback_data: "allOrders",
                        },
                    ],
                    [{ text: "💼 Повернутися до гаманця", callback_data: "wallet" }],
                    [{ text: "Назад", callback_data: "back" }],
                ],
            },
        };
        return sendMessage(chatId, text, menu);
    }
    catch (error) {
        console.error("❌ Помилка при скасуванні оплати:", error);
        return sendMessage(chatId, "❌ Не вдалося скасувати оплату.");
    }
};
export default cancelPaymentProcess;
