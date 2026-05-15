import { pool, userState } from "@/exports.js";
import { IShowOrders } from "./interface.js";
import { sendMessage } from "@/functions/index.js";

const showOrders: IShowOrders = async (params) => {
  try {
    const { userOffsets, chatId, type, text } = params;

    const offset = userOffsets[chatId] ?? 0;

    const query = `
      SELECT * FROM orders
      WHERE chat_id != $2
        AND status = 'active'
        AND type = $3
      ORDER BY created_at ASC
      LIMIT 2 OFFSET $1
    `;

    const response = await pool.query(query, [offset, chatId, type]);

    if (response.rows.length === 0) {
      return sendMessage(chatId, "📭 Пока нет заявок.");
    }

    let messageText = `📄 ${text}:\n\n`;

    const inline_keyboard = [];

    response.rows.forEach((order) => {
      const { id, username, crypto, amount, price, status } = order;

      messageText += `Оголошення #${id}\n👤 @${username}\n💱 Крипта: ${crypto}\n💰 Сума: ${amount}\n💵 Ціна: ${price}\n📌 Статус: ${status}\n\n`;

      inline_keyboard.push([
        {
          text: `Вибрати оголошення #${id}`,
          callback_data: `select_order_${id}`,
        },
      ]);
    });

    inline_keyboard.push([
      { text: "⬅️ Попередня сторінка", callback_data: "show_crypto_prev" },
      { text: "➡️ Наступна сторінка", callback_data: "show_crypto_next" },
    ]);

    sendMessage(chatId, messageText, {
      reply_markup: { inline_keyboard },
    });

    userState[chatId] = {
      ...userState[chatId],
    };
  } catch (error) {
    console.log("showOrders: ❌ Помилка при отриманні заявок:", error);
  }
};

export default showOrders;
