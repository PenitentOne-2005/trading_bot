import pool from "../../db.js";
import sendMessage from "../sendMessage/sendMessage.js";
const confirmOrderPreview = async (action, chatId, orderId) => {
    if (!action) {
        return sendMessage(chatId, "⚠️ Невідома таблиця заявок.");
    }
    const query = `SELECT * FROM ${action} WHERE id = $1`;
    const result = await pool.query(query, [orderId]);
    if (result.rows.length === 0) {
        return sendMessage(chatId, "⚠️ Заявку не знайдено.");
    }
    const { amount, crypto, price } = result.rows[0];
    const sumToPay = amount * price;
    const actionText = action === "buy_requests"
        ? `🟢 Пiдтвердження\nВи збираєтесь *купити* ${amount} ${crypto} за ${sumToPay} UAH`
        : `🔴 Пiдтвердження\nВи збираєтесь *продати* ${amount} ${crypto} за ${sumToPay} UAH`;
    return sendMessage(chatId, `📝 ${actionText} #${orderId}`);
};
export default confirmOrderPreview;
