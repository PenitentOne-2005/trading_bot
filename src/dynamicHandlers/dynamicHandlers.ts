import { DynamicHandlers } from "./interface.js";
import { pool, userState } from "@/exports.js";
import { sendMessage } from "@/functions/index.js";
import { unPublishMenu } from "./unPublishMenu.js";

const dynamicHandlers: DynamicHandlers = {
  buy_: async (data, { chatId }) => {
    const { processBuyCryptoSelection } = await import("@/functions/index.js");

    processBuyCryptoSelection(data, chatId, userState);
  },

  withdraw_: async (data, { chatId }) => {
    const { promptWithdrawAmount } = await import("@/functions/index.js");

    promptWithdrawAmount(chatId, data, userState);
  },

  select_order_: async (data, { chatId }) => {
    const { confirmOrderPreview } = await import("@/functions/index.js");

    const orderId = data.replace("select_order_", "");

    await pool.query(
      `UPDATE orders
      SET status = 'waiting', buyer_chat_id = $1
      WHERE id = $2`,
      [chatId, orderId],
    );

    await confirmOrderPreview(chatId, orderId);
  },

  agree_get_: async (data, { chatId }) => {
    const { handleConfirmFiat, sendCryptoTransaction } =
      await import("@/functions/index.js");

    try {
      const orderId = data.replace("agree_get_", "");

      if (!orderId) {
        sendMessage(chatId, "❗ orderId не указан.");
        return;
      }

      await sendCryptoTransaction(orderId);

      await handleConfirmFiat(chatId, orderId);
    } catch (err) {
      console.error("Ошибка в agree_get_:", err);
      sendMessage(chatId, "❌ Произошла ошибка при обработке.");
    }
  },

  unpublish_: async (data, { chatId }) => {
    const { currentDb } = userState[chatId];

    const orderId = data.replace("unpublish_", "");

    const { rowCount } = await pool.query(
      `SELECT 1 FROM ${currentDb} WHERE id = $1`,
      [orderId]
    );

    if (!rowCount) {
      return sendMessage(chatId, "❌ Оголошення не знайдено або вже видалене");
    }

    await pool.query(
      `UPDATE ${currentDb}
       SET status = 'unpublished'
       WHERE id = $1`,
      [orderId]
    );

    sendMessage(
      chatId,
      `✅ Оголошення успiшно знято з публiкацiї.
Оголошення №${orderId} бiльше не вiдображається у списку активних.

Що далi?`,
      unPublishMenu
    );
  },

  delete_: async (data, { chatId }) => {
    try {
      const { currentDb } = userState[chatId];

      const orderId = data.replace("delete_", "");

      const { rowCount } = await pool.query(
        `
      SELECT 1
      FROM ${currentDb}
      WHERE id = $1 AND chat_id = $2 AND status != 'deleted'
      `,
        [orderId, chatId]
      );

      if (!rowCount) {
        return sendMessage(
          chatId,
          "❌ Оголошення не знайдено або воно вже видалене."
        );
      }

      await pool.query(
        `
      UPDATE ${currentDb}
      SET status = 'deleted'
      WHERE id = $1
      `,
        [orderId]
      );

      sendMessage(
        chatId,
        `🗑️ Оголошення №${orderId} успішно видалено. Всi данi про це оголошення були видаленi. Що далi?`,
        unPublishMenu
      );
    } catch (err) {
      console.error("❌ Помилка в delete_:", err);
      sendMessage(chatId, "⚠️ Сталася помилка при видаленні оголошення.");
    }
  },
};

export default dynamicHandlers;
