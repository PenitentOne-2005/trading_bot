import { GetActiveOrders } from "./interface.js";
import { pool, userOffsets, userState } from "@/exports.js";
import { sendMessage } from "@/functions/index.js";
import createKeyBoard from "./createKeyBoard.js";

const renderActiveOrders: GetActiveOrders = async (chatId, currentDb) => {
  try {
    const offset = userOffsets[chatId] ?? 0;

    const query = `
      SELECT *
      FROM ${currentDb}
      WHERE chat_id = $1 AND status = 'active'
      ORDER BY created_at ASC
      LIMIT 50
    `;

    const result = await pool.query(query, [chatId]);

    if (result.rows.length === 0) {
      return sendMessage(chatId, "📭 У вас немає активних оголошень.");
    }

    // 5. Сохраняем total для пагинации
    userOffsets[chatId] = result.rows.length;

    // 6. Берём одну заявку по offset
    const item = result.rows[offset];
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
💵 Ціна: ${item.price} за 1 ${item.crypto}
🏦 Оплата: ${payMethod}
    `;

    userState[chatId] = {
      ...userState[chatId],
      currentDb,
    };

    const inline_keyboard = createKeyBoard(item.id);

    // Пагинация
    inline_keyboard.push([
      { text: "⬅️", callback_data: "active_prev" },
      {
        text: `${offset + 1} / ${result.rows.length}`,
        callback_data: "noop",
      },
      { text: "➡️", callback_data: "active_next" },
    ]);

    inline_keyboard.push([{ text: "Назад", callback_data: "back" }]);

    sendMessage(chatId, message, {
      reply_markup: { inline_keyboard },
    });
  } catch (err) {
    console.log("❌ Помилка в active_orders:", err);
  }
};

export default renderActiveOrders;
