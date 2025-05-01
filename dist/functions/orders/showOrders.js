import pool from "../../db.js";
import { userOffsets } from "./userOffsets.js";
import sendMessage from "../send/sendMessage.js";
import { ordersMenu } from "./showOrdersKeyBoard.js";
const showOrders = async (msg) => {
    try {
        const offset = userOffsets[msg.chat.id] ?? 0;
        const query = `SELECT * FROM sell_requests ORDER BY created_at ASC LIMIT 1 OFFSET $1`;
        const response = await pool.query(query, [offset]);
        if (response.rows.length === 0) {
            sendMessage(msg.chat.id, "📭 Пока нет заявок.");
            return;
        }
        const order = response.rows[0];
        const { username, crypto, amount, status } = order;
        const formattedOrder = `username: ${username}\ncrypto: ${crypto}\namount: ${amount}\nstatus: ${status}`;
        sendMessage(msg.chat.id, `\n${formattedOrder}`, ordersMenu);
    }
    catch (error) {
        console.log("❌ Ошибка при получении заявок:", error);
    }
};
export default showOrders;
