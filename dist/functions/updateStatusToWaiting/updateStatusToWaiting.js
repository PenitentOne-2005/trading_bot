import { pool } from "@/exports.js";
import { sendMessage } from "@/functions";
const updateStatusToWaiting = async (userState, chatId, currentDb) => {
    try {
        const orderId = userState[chatId]?.orderId;
        if (!orderId) {
            return sendMessage(chatId, "❗ Заявка не знайдена або вже оброблена.");
        }
        const selectQuery = `SELECT * FROM ${currentDb} WHERE id = $1`;
        const result = await pool.query(selectQuery, [orderId]);
        if (result.rows.length === 0) {
            return sendMessage(chatId, "❌ Заявка не знайдена.");
        }
        const updateQuery = `
      UPDATE ${currentDb}
      SET status = 'waiting', buyer_chat_id = $1
      WHERE id = $2
    `;
        await pool.query(updateQuery, [chatId, orderId]);
    }
    catch (error) {
        console.error("❌ Помилка при оновленні заявки:", error);
        return sendMessage(chatId, "❌ Сталася помилка при обробці заявки.");
    }
};
export default updateStatusToWaiting;
