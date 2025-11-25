import { pool, userOffsets } from "../../exports.js";
import { sendMessage } from "../../functions/index.js";
const renderActiveOrders = async (chatId) => {
    try {
        const offset = userOffsets[chatId] ?? 0;
        const buyQuery = `
      SELECT * FROM buy_requests
      WHERE chat_id = $1 AND status = 'active'
      ORDER BY created_at ASC
    `;
        const buyResult = await pool.query(buyQuery, [chatId]);
        const sellQuery = `
      SELECT * FROM sell_requests
      WHERE chat_id = $1 AND status = 'active'
      ORDER BY created_at ASC
    `;
        const sellResult = await pool.query(sellQuery, [chatId]);
        const allRequests = [...buyResult.rows, ...sellResult.rows];
        if (allRequests.length === 0) {
            return sendMessage(chatId, "📭 У вас немає активних оголошень.");
        }
        // 5. Сохраняем total для пагинации
        userOffsets[chatId] = allRequests.length;
        // 6. Берём одну заявку по offset
        const item = allRequests[offset];
        if (!item) {
            return sendMessage(chatId, "📭 Більше оголошень немає.");
        }
        const payQuery = `SELECT * FROM payments WHERE telegram_id = $1`;
        const res = await pool.query(payQuery, [chatId]);
        const payments = JSON.parse(res.rows[0]?.metadata || "{}");
        const payMethod = payments.IBAN ? "IBAN" : "Card";
        const message = `
Оголошення #${item.id}
💱 Крипта: ${item.crypto}
💰 Діапазон: ${item.amount}
💵 Ціна: ${item.price}
🏦 Оплата: ${payMethod}
    `;
        const inline_keyboard = [];
        inline_keyboard.push([
            { text: "Редагувати", callback_data: `edit_${item.id}` },
        ]);
        inline_keyboard.push([
            { text: "Зняти з публікації", callback_data: `unpublish_${item.id}` },
        ]);
        inline_keyboard.push([
            { text: "Видалити", callback_data: `delete_${item.id}` },
        ]);
        // Пагинация
        inline_keyboard.push([
            { text: "⬅️", callback_data: "active_prev" },
            {
                text: `${offset + 1} / ${allRequests.length}`,
                callback_data: "noop",
            },
            { text: "➡️", callback_data: "active_next" },
        ]);
        inline_keyboard.push([{ text: "Назад", callback_data: "back" }]);
        sendMessage(chatId, message, {
            reply_markup: { inline_keyboard },
        });
    }
    catch (err) {
        console.log("❌ Помилка в active_orders:", err);
    }
};
export default renderActiveOrders;
