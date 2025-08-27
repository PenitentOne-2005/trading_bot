import { pool } from "../../exports.js";
import { sendMessage } from "../../functions/index.js";
const notifySellerEscrowStarted = async (userState, chatId) => {
    const { orderId, sumToPay } = userState[chatId] ?? {};
    if (!orderId) {
        return sendMessage(chatId, "❗ orderId не указан.");
    }
    const sellerQuery = `SELECT chat_id, amount FROM sell_requests WHERE id = $1`;
    const sellerResult = await pool.query(sellerQuery, [orderId]);
    if (sellerResult.rows.length > 0) {
        const { chat_id, amount } = sellerResult.rows[0];
        sendMessage(chat_id, `✅ Успiшно!
      Криптовалюта перемещiна в ескроу. Очiкує підтвердження вiд покупця про вiдправку коштiв.

        Оголошення #${orderId}
        Продали: ${amount}
        Сума: ${sumToPay}
        Статус: Виконується
        Реквiзити для оплати переданi покупцевi.
          Термін дiï: 30хв
        ! На цьому етапi угоду скасувати неможливо, вона проходить через блокчейн.`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "📃 Пiдтвердити отримання грошей",
                            callback_data: `agree_get_${orderId}`,
                        },
                    ],
                    [{ text: "ℹ️ Моï замовлення", callback_data: "myOrders" }],
                ],
            },
        });
    }
};
export default notifySellerEscrowStarted;
