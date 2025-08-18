import pool from "../../db.js";
import dataMap from "../../map.js";
import { userState } from "../../userState.js";
import { Props } from "./interface.js";
import { showPaymentBuy, showPaymentSell } from "./menu.js";
import sendMessage from "../sendMessage/sendMessage.js";

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
      ? `🔴 Пiдтвердження\nВи збираєтесь *продати* ${amount} ${crypto} за ${sumToPay} UAH\n Пiсля пiдтвердження криптовалюта буде перемiщена в ескроу-контракт.\n Термiн дiї: 30хв\n Активи зберігаються там підтвердження отримання платежу і автоматично переказуються смартконтрактом отримувачу після повного підтвердження операції.\n\n При виникненні проблеми ви матимете можливість оскаржити операцію. Скарга буде розглянута спільнотою.\n • Підтверджуєте переміщення коштів у ескроу?`
      : `🟢 Пiдтвердження\nВи збираєтесь *купити* ${amount} ${crypto} за ${sumToPay} UAH\n \n Наступний крок: Ви маєте надiслати ${sumToPay} UAH продавцю та пiдтвердити оплату.\n Термiн дiї: 30хв\n Пiдтверджуєте, що хочете продовжити?`;

  const menu = action === "buy_requests" ? showPaymentSell : showPaymentBuy;

  userState[chatId] = {
    ...userState[chatId],
    orderId: orderId,
    amount: amount,
    sumToPay: sumToPay,
    crypto: crypto,
  };

  dataMap.set("second_user_chat_id", chatId);

  return sendMessage(chatId, `📝 ${actionText}`, menu);
};

export default confirmOrderPreview;
