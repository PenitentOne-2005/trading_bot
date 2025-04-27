import pool from "../../db";
import { userOffsets } from "./userOffsets";
import sendMessage from "../send/sendMessage";
import { ordersMenu } from "./showOrdersKeyBoard";
const showOrders = async (msg) => {
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
};
export default showOrders;
