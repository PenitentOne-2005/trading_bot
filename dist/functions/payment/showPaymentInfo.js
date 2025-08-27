import { showPaymentInfoKeyBoard, pool } from "../../exports.js";
import { sendMessage } from "../../functions/index.js";
const showPaymentInfo = async (userState, chatId) => {
    const { amount, sumToPay } = userState[chatId] ?? {};
    const query = `SELECT * FROM payments WHERE telegram_id = $1`;
    const result = await pool.query(query, [chatId]);
    const metadata = JSON.parse(result.rows[0].metadata);
    const text = `Надiшлiть ${sumToPay} UAH продавцю за наступними реквiзитами:
   Сума ${amount} USDT переведена в ескроу контракт, що очiкує пiдтвердження отримання оплати вiд продавця.

    Спосiб оплати: IBAN
    Номер IBAN: ${metadata.IBAN}
    Отримувач: ${metadata.name}
      Термiн дiï: 30хв
    Пiдтверждуєте, що надiслали кошти?`;
    userState[chatId] = {
        ...userState[chatId],
        IBAN: metadata.IBAN,
        Name: metadata.name,
    };
    return sendMessage(chatId, text, showPaymentInfoKeyBoard);
};
export default showPaymentInfo;
