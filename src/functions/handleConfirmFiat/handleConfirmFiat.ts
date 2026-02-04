import { pool, agreeGetKeyBoard, dataMap } from "@/exports.js";
import { getWalletAddress, sendMessage } from "@/functions/index.js";
import { HandleConfirmFiat } from "./interface.js";
import { handleConfirmFiatMenu } from "./menu.js";
import sendFromEscrowTRC20 from "./sendFromEscrowTRC20.js";
import sendFromEscrowTRX from "./sendFromEscrowTRX.js";

const handleConfirmFiat: HandleConfirmFiat = async (chatId, orderId) => {
  const currentDb = dataMap.get("currentDb");

  if (!currentDb) {
    return sendMessage(chatId, "❌ Внутренняя ошибка. Таблица не определена.");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderQuery = `
      SELECT
        buyer_chat_id,
        amount,
        price,
        crypto,
        status
      FROM ${currentDb}
      WHERE id = $1
      FOR UPDATE
    `;

    const orderResult = await client.query(orderQuery, [orderId]);

    if (orderResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return sendMessage(chatId, "❌ Ордер не найден.");
    }

    const { buyer_chat_id, amount, price, crypto, status } =
      orderResult.rows[0];

    // 3️⃣ Проверяем статус
    if (status !== "waiting") {
      await client.query("ROLLBACK");
      return sendMessage(chatId, "❌ Ордер уже завершён или отменён.");
    }

    const sumToPay = amount * price;

    const buyerWallet = await getWalletAddress(buyer_chat_id);

    if (!buyerWallet) {
      await client.query("ROLLBACK");
      return sendMessage(chatId, "❌ Кошелёк покупателя не найден.");
    }

    if (crypto === "TRX") {
      await sendFromEscrowTRX(amount, buyerWallet);
    } else {
      await sendFromEscrowTRC20(crypto, amount, buyerWallet);
    }

    const updateQuery = `
      UPDATE ${currentDb}
      SET
        status = 'completed',
        completed_at = NOW()
      WHERE id = $1
    `;

    await client.query(updateQuery, [orderId]);

    // 7️⃣ Фиксируем транзакцию
    await client.query("COMMIT");

    // 8️⃣ Уведомляем покупателя
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
      handleConfirmFiatMenu,
    );

    // 9️⃣ Уведомляем продавца
    await sendMessage(
      chatId,
      `Успiшно! Ескроу-контракт вiдправив криптовалюту покупцевi.

Оголошення #${orderId}
Продано: ${amount} ${crypto}
Сума: ${sumToPay}
Комiсiя за послугу: 1 ${crypto} (0.5%)
Статус: Завершено
Що далi?`,
      agreeGetKeyBoard,
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("handleConfirmFiat error:", error);

    await sendMessage(
      chatId,
      "❌ Сталася помилка при підтвердженні угоди. Спробуйте пізніше.",
    );
  } finally {
    client.release();
  }
};

export default handleConfirmFiat;
