import { sendMessage } from "@/functions/index.js";
import { QuickBlocking } from "./interface.js";

const quickBlocking: QuickBlocking = async (props) => {
  let { client, orderId, chatId } = props;

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      SELECT buyer_chat_id, chat_id, amount, price, crypto, status, type
      FROM orders
      WHERE id = $1
      FOR UPDATE
      `,
      [orderId],
    );

    if (orderResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return sendMessage(chatId, "❌ Ордер не найден.");
    }

    const { buyer_chat_id, chat_id, amount, price, crypto, status, type } =
      orderResult.rows[0];

    if (status !== "waiting") {
      await client.query("ROLLBACK");
      return sendMessage(chatId, "❌ Ордер уже завершён или отменён.");
    }

    // переводим в processing
    await client.query(
      `
      UPDATE orders
      SET status = 'processing'
      WHERE id = $1
      `,
      [orderId],
    );

    await client.query("COMMIT");

    return { buyer_chat_id, chat_id, amount, price, crypto, type };
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("quickBlocking: Ошибка обработки ордера:", error);

    return sendMessage(chatId, "❌ Ошибка обработки ордера.");
  }
};

export default quickBlocking;
