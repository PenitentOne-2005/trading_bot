import pool from "../../db.js";
import { agreeGetKeyBoard } from "../callbackHandlers/menu.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { HandleConfirmFiat } from "./interface.js";
import { handleConfirmFiatMenu } from "./menu.js";

const handleConfirmFiat: HandleConfirmFiat = async (chatId, orderId) => {
  const sellerQuery = `
    SELECT buyer_chat_id, amount, price, crypto
    FROM sell_requests
    WHERE id = $1
  `;
  const sellerResult = await pool.query(sellerQuery, [orderId]);

  if (sellerResult.rows.length === 0) {
    return sendMessage(chatId, "❌ Ордер не найден.");
  }

  const { buyer_chat_id, amount, price, crypto } = sellerResult.rows[0];
  const sumToPay = amount * price;

  // Сообщение покупателю
  await sendMessage(
    buyer_chat_id,
    `✅ Успiшно! Продавец пiдтвердив отримання фiатного платежу.

        Оголошення #${orderId}
        Куплено: ${amount}
        Сума: ${sumToPay}
        Комісія за послугу: 1 ${crypto} (0.5%)
        Статус: Завершено
        Кошти успiшно переведенi на ваш гаманець!
        Що далi?`,
    handleConfirmFiatMenu
  );

  // Сообщение продавцу
  await sendMessage(
    chatId,
    `Успiшно! Ескроу-контракт вiдправив криптовалюту покупцевi.
    
     Оголошення #${orderId}
     Продано: ${amount} ${crypto}
     Сума: ${sumToPay}
     Комiсiя за послугу: 1 ${crypto} (0.5%)
     Статус: Завершено
     Що далi?`,
    agreeGetKeyBoard
  );
};

export default handleConfirmFiat;
