import { pool, userOffsets, userState } from "../../exports.js";
import { sendMessage } from "../../functions/index.js";
import createKeyBoard from "./createKeyBoard.js";
const renderActiveOrders = async (chatId, currentDb) => {
    try {
        let offset = userOffsets[chatId] ?? 0;
        const query = `
      SELECT *
      FROM ${currentDb}
      WHERE chat_id = $1 AND status = 'active'
      ORDER BY created_at ASC
      LIMIT 50
    `;
        const result = await pool.query(query, [chatId]);
        const rows = result.rows;
        if (rows.length === 0) {
            userOffsets[chatId] = 0;
            return sendMessage(chatId, "📭 У вас немає активних оголошень.");
        }
        if (offset < 0)
            offset = 0;
        if (offset >= rows.length)
            offset = rows.length - 1;
        userOffsets[chatId] = offset;
        const item = rows[offset];
        const payQuery = `SELECT * FROM payments WHERE telegram_id = $1`;
        const res = await pool.query(payQuery, [chatId]);
        const payments = JSON.parse(res.rows[0]?.metadata || "{}");
        const payMethod = payments.IBAN ? "IBAN" : "Card";
        const message = `
Оголошення #${item.id}
💱 Крипта: ${item.crypto}
💰 Діапазон: ${item.amount}
💵 Ціна: ${item.price} за 1 ${item.crypto}
🏦 Оплата: ${payMethod}
    `;
        userState[chatId] = {
            ...userState[chatId],
            currentDb,
        };
        const inline_keyboard = createKeyBoard(item.id);
        inline_keyboard.push([
            { text: "⬅️", callback_data: "active_prev" },
            {
                text: `${offset + 1} / ${rows.length}`,
                callback_data: "noop",
            },
            { text: "➡️", callback_data: "active_next" },
        ]);
        inline_keyboard.push([{ text: "Назад", callback_data: "back" }]);
        return sendMessage(chatId, message, {
            reply_markup: { inline_keyboard },
        });
    }
    catch (err) {
        console.log("❌ Помилка в active_orders:", err);
    }
};
export default renderActiveOrders;
