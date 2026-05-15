import { userState, pool } from "@/exports.js";
import { Props } from "./interface.js";
import { showPaymentBuy, showPaymentSell } from "./menu.js";
import { sendMessage } from "@/functions/index.js";

const confirmOrderPreview: Props = async (chatId, orderId) => {
  const query = `SELECT * FROM orders WHERE id = $1`;
  const result = await pool.query(query, [orderId]);

  if (result.rows.length === 0) {
    return sendMessage(chatId, "⚠️ Заявку не знайдено.");
  }

  const { amount, crypto, price, type } = result.rows[0];

  const sumToPay = amount * price;

  const actionText =
    type === "buy"
      ? `🔴 Пiдтвердження
      Ви збираєтесь *продати* ${amount} ${crypto} за ${sumToPay} UAH
      Пiсля пiдтвердження криптовалюта буде перемiщена в ескроу-контракт.
        Термiн дiї: 30хв
        Активи зберігаються там підтвердження отримання платежу і автоматично переказуються смартконтрактом отримувачу після повного підтвердження операції.
        
        При виникненні проблеми ви матимете можливість оскаржити операцію. Скарга буде розглянута спільнотою.
        • Підтверджуєте переміщення коштів у ескроу?`
      : `🟢 Пiдтвердження
      Ви збираєтесь *купити* ${amount} ${crypto} за ${sumToPay} UAH
      
      Наступний крок: Ви маєте надiслати ${sumToPay} UAH продавцю та пiдтвердити оплату.
       Термiн дiї: 30хв
      Пiдтверджуєте, що хочете продовжити?`;

  const menu = type === "buy" ? showPaymentSell : showPaymentBuy;

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
