import pool from "@/db.js";
import { SendEscrowMessages, PaymentMetadata } from "./interface.js";
import { sendMessage } from "@/functions/index.js";
import dataMap from "@/map.js";

const sendEscrowMessages: SendEscrowMessages = async (userState, chatId) => {
  const { orderId } = userState[chatId] ?? {};

  if (!orderId) {
    throw new Error("sendEscrowMessages: orderId не найден");
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
    throw new Error("sendEscrowMessages: Заявка не найдена");
  }

  const { chat_id, buyer_chat_id, type, amount, price, crypto } =
    orderRes.rows[0];

  let sellerChatId: number;
  let buyerChatId: number;

  if (type === "sell") {
    // создатель продаёт
    sellerChatId = chat_id;
    buyerChatId = buyer_chat_id;
  } else {
    // создатель покупает
    sellerChatId = buyer_chat_id;
    buyerChatId = chat_id;
  }

  if (!sellerChatId || !buyerChatId) {
    throw new Error("sendEscrowMessages: Не определены роли сделки");
  }

  // 🔹 Берём реквизиты ПРОДАВЦА
  const paymentRes = await pool.query(
    `SELECT metadata FROM payments WHERE telegram_id = $1`,
    [sellerChatId],
  );

  if (!paymentRes.rows.length) {
    throw new Error("sendEscrowMessages: Реквизиты продавца не найдены");
  }

  let metadataParsed: PaymentMetadata;

  try {
    metadataParsed = JSON.parse(paymentRes.rows[0].metadata);
  } catch {
    throw new Error("sendEscrowMessages: Неверные метаданные платежа");
  }

  const sumToPay = Number(price) * Number(amount);

  const isIBAN = !!metadataParsed.IBAN;

  const paymentType = isIBAN ? "IBAN" : "Картка";

  const paymentInfo = isIBAN
    ? `Номер IBAN: ${metadataParsed.IBAN}
Отримувач: ${metadataParsed.name}`
    : `Картка: ${metadataParsed.text}`;

  sendMessage(
    sellerChatId,
    `✅ Успiшно!
        Криптовалюта перемещiна в ескроу. Очiкує підтвердження вiд покупця про вiдправку коштiв.
          Оголошення: #${orderId}
          Продали: ${amount}
          Сума: ${sumToPay}
          Статус: Виконується
          Реквiзити для оплати переданi покупцевi.
            Термін дiï: 30хв
          ! На цьому етапi угоду скасувати неможливо, вона проходить через блокчейн.`,
    {
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
    },
  );

  dataMap.set("orderID", orderId);

  return sendMessage(
    buyerChatId,
    `Надiшлiть ${sumToPay} UAH продавцю за наступними реквiзитами:
        
        Сума ${amount} ${crypto} переведена в ескроу контракт, що очiкує пiдтвердження отримання оплати вiд продавця.
        
        Спосiб оплати: ${paymentType}
        ${paymentInfo}
         Термiн дiï: 30хв
        Пiдтверждуєте, що надiслали кошти?`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Так, я надiслав(ла) оплату",
              callback_data: "agree_sent",
            },
          ],
          [{ text: "Скасувати", callback_data: "cancel" }],
        ],
      },
    },
  );
};

export default sendEscrowMessages;
