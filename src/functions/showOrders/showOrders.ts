import pool from "../../db.js";
import { IShowOrders } from "./interface.js";
import { ordersKeyBoard } from "./ordersKeyBoard.js";
import sendMessage from "../sendMessage/sendMessage.js";

const showOrders: IShowOrders = async (params) => {
  try {
    const { userOffsets, chatId, dbName, text } = params;

    const offset = userOffsets[chatId] ?? 0;

    const query = `SELECT * FROM ${dbName} ORDER BY created_at ASC LIMIT 2 OFFSET $1`;
    const response = await pool.query(query, [offset]);

    if (response.rows.length === 0) {
      return sendMessage(chatId, "📭 Пока нет заявок.");
    }

    let messageText = `📄 ${text}:\n\n`;
    response.rows.forEach((order, index) => {
      const { id, username, crypto, amount, price, status } = order;
      messageText += `#${
        offset + index + 1
      }\n Оголошення #${id}\n 👤 Пользователь: @${username}\n💱 Крипта: ${crypto}\n💰 Сумма: ${amount}\n💵 Цена: ${price}\n📌 Статус: ${status}\n\n`;
    });

    await sendMessage(chatId, messageText, ordersKeyBoard);

    userOffsets[chatId] = offset + response.rows.length;
  } catch (error) {
    console.log("❌ Ошибка при получении заявок:", error);
  }
};

export default showOrders;
