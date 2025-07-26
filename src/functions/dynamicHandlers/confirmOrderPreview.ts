import { Props } from "./interface.js";
import pool from "../../db.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";

const confirmOrderPreview: Props = async (action, chatId, orderId) => {
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

  const actionText =
    action === "buy_requests"
      ? `🟢 Пiдтвердження\nВи збираєтесь *купити* ${amount} ${crypto} за ${sumToPay} UAH\n Наступний крок: Ви маєте надiслати ${sumToPay} UAH продавцю та пiдтвердити оплату.\n Термiн дiї: 30хв\n Пiдтверджуєте, що хочете продовжити?`
      : `🔴 Пiдтвердження\nВи збираєтесь *продати* ${amount} ${crypto} за ${sumToPay} UAH\n Пiсля пiдтвердження криптовалюта буде перемiщена в ескроу-контракт.\n Термiн дiї: 30хв\n Активи зберігаються там підтвердження отримання платежу і
автоматично переказуються смартконтрактом отримувачу після повного підтвердження операції.\n\n При виникненні проблеми ви матимете можливість оскаржити операцію. Скарга буде розглянута спільнотою.\n • Підтверджуєте переміщення коштів у ескроу?`;

  const menu =
    action === "buy_requests"
      ? {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Так, переглянути реквiзити для оплати",
                  callback_data: "show_payment_buy_info",
                },
              ],
              [{ text: "Назад", callback_data: "back" }],
            ],
          },
        }
      : {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Так, підтверджую",
                  callback_data: "show_payment_sell_info",
                },
              ],
              [{ text: "Назад", callback_data: "back" }],
            ],
          },
        };

  userState[chatId] = {
    ...userState[chatId],
    orderId: orderId,
    amount: amount,
    sumToPay: sumToPay,
    crypto: crypto,
  };

  return sendMessage(chatId, `📝 ${actionText}`, menu);
};

export default confirmOrderPreview;
