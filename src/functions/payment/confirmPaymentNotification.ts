import { FuncInfoProps } from "./interface.js";
import {
  confirmPaymentNotificationKeyBoard,
  dataMap,
  pool,
} from "@/exports.js";
import { sendMessage } from "@/functions/index.js";

const confirmPaymentNotification: FuncInfoProps = async () => {
  const orderId = dataMap.get("orderID");

  if (!orderId) {
    throw new Error("confirmPaymentNotification: orderId не найден");
  }

  const orderRes = await pool.query(
    `
    SELECT 
      chat_id,
      buyer_chat_id,
      type,
      amount,
      price,
      crypto
    FROM orders
    WHERE id = $1
  `,
    [orderId],
  );

  if (!orderRes.rows.length) {
    throw new Error("confirmPaymentNotification: Заявка не найдена");
  }

  const { chat_id, buyer_chat_id, type, amount, crypto } = orderRes.rows[0];

  let sellerChatId;
  let buyerChatId;

  if (type === "sell") {
    sellerChatId = chat_id;
    buyerChatId = buyer_chat_id;
  } else {
    sellerChatId = buyer_chat_id;
    buyerChatId = chat_id;
  }

  // 🔹 реквизиты продавца
  const paymentRes = await pool.query(
    `SELECT metadata FROM payments WHERE telegram_id = $1`,
    [sellerChatId],
  );

  if (!paymentRes.rows.length) {
    throw new Error("confirmPaymentNotification: Реквизиты не найдены");
  }

  const metadata = JSON.parse(paymentRes.rows[0].metadata);

  const paymentInfo = metadata.IBAN
    ? `Спосiб оплати: ${metadata.IBAN}
Отримувач: ${metadata.name}`
    : `Спосiб оплати: ${metadata.text}`;

  const text = `
Ваше пiдтвердження вiдправки отримано!

Оголошення #${orderId}
Сума: ${amount} ${crypto}

${paymentInfo}

Статус: Очiкує пiдтвердження вiд продавця

Продавець отримав повiдомлення та має пiдтвердити оплату.
Що далi?
`;

  return sendMessage(buyerChatId, text, confirmPaymentNotificationKeyBoard);
};

export default confirmPaymentNotification;
