import { FuncInfoProps } from "./interface.js";
import pool from "../../db.js";
import sendMessage from "../sendMessage/sendMessage.js";

const showPaymentInfo: FuncInfoProps = async (userState, chatId) => {
  const { orderId, amount, sumToPay } = userState[chatId] ?? {};

  const query = `SELECT * FROM payments WHERE id = $1`;
  const result = await pool.query(query, [orderId]);

  const metadata = JSON.parse(result.rows[0].metadata);

  const text = `Надiшлiть ${sumToPay} UAH продавцю за наступними реквiзитами:\n\n Сума ${amount} USDT переведена в ескроу контракт, що очiкує пiдтвердження отримання оплати вiд продавця.\n Спосiб оплати: IBAN\n Номер IBAN: ${metadata.IBAN}\n Отримувач: ${metadata.name}\n Термiн дiï: 30хв\n Пiдтверждуєте, що надiслали кошти?`;

  const menu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Так, я надiслав(ла) оплату", callback_data: "agree_sent" }],
        [{ text: "Скасувати", callback_data: "cancel" }],
      ],
    },
  };

  userState[chatId] = {
    ...userState[chatId],
    IBAN: metadata.IBAN,
    Name: metadata.name,
  };

  return sendMessage(chatId, text, menu);
};

export default showPaymentInfo;
