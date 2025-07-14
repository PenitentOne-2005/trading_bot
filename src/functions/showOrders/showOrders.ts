import pool from "../../db.js";
import { IShowOrders } from "./interface.js";
import { ordersKeyBoard } from "./ordersKeyBoard.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";

const showOrders: IShowOrders = async (params) => {
  try {
    const { userOffsets, chatId, dbName, text } = params;

    const offset = userOffsets[chatId] ?? 0;
    const query = `SELECT * FROM ${dbName} ORDER BY created_at ASC LIMIT 2 OFFSET $1`;
    const response = await pool.query(query, [offset]);

    if (response.rows.length === 0) {
      return sendMessage(chatId, "📭 Пока нет заявок.");
    }

    let messageText = `📄 ${text}\n\n`;

    const inline_keyboard = [];

    response.rows.forEach((order, index) => {
      const { id, username, crypto, amount, price, status } = order;

      messageText += `#${
        offset + index + 1
      }\n Оголошення #${id}\n👤 @${username}\n💱 Крипта: ${crypto}\n💰 Сума: ${amount}\n💵 Ціна: ${price}\n📌 Статус: ${status}\n\n`;

      inline_keyboard.push([
        {
          text: `Вибрати оголошення #${id}`,
          callback_data: `select_order_${id}`,
        },
      ]);
    });

    inline_keyboard.push([
      { text: "⬅️ Попередня сторінка", callback_data: "buy_crypto_prev" },
      { text: "➡️ Наступна сторінка", callback_data: "buy_crypto_next" },
    ]);

    sendMessage(chatId, messageText, {
      reply_markup: { inline_keyboard },
    });

    userOffsets[chatId] = offset + response.rows.length;
    userState[chatId] = {
      ...userState[chatId],
      currentDb: dbName,
    };
  } catch (error) {
    console.log("❌ Помилка при отриманні заявок:", error);
  }
};

export default showOrders;
