import { Message } from "node-telegram-bot-api";
import { CallbackProps } from "../../interface.js";
import { userState } from "../../userState.js";
import { agreeGetKeyBoard } from "../callbackHandlers/menu.js";
import sendMessage from "../sendMessage/sendMessage.js";
import pool from "../../db.js";

const dynamicHandlers: {
  [key: string]: (
    data: string,
    props: CallbackProps
  ) => void | Promise<void | Message>;
} = {
  buy_: async (data, props) => {
    const processBuyCryptoSelection = (
      await import("../processBuyCryptoSelection/processBuyCryptoSelection.js")
    ).default;

    processBuyCryptoSelection(data, props.chatId, userState);
  },

  select_order_: async (data, { chatId }) => {
    const orderId = data.replace("select_order_", "");
    const action = userState[chatId]?.currentDb;

    const confirmOrderPreview = (await import("./confirmOrderPreview.js"))
      .default;

    await confirmOrderPreview(action, chatId, orderId);
  },

  agree_get_: async (data, { chatId }) => {
    const orderId = data.split("_")[2];

    if (!orderId) {
      return sendMessage(chatId, "❗ orderId не указан.");
    }

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
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "📃 Всі оголошення", callback_data: "allOrders" }],
            [{ text: "📌 Мої оголошення", callback_data: "myOrders" }],
            [{ text: "💼 Гаманець", callback_data: "wallet" }],
          ],
        },
      }
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
  },
};

export default dynamicHandlers;
