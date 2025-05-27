import { IBuyOrder } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";
import saveRequest from "../saveRequests/saveRequest.js";

const createBuyOrder: IBuyOrder = async (props) => {
  const { currentState, CRYPTOS, text, chatId, userState, username, mainMenu } =
    props;

  if (!username || !text) return;

  switch (currentState.step) {
    case "idle": {
      await sendMessage(
        chatId,
        "ВАЖЛИВА ІНФОРМАЦІЯ\n ! Єдиний офіційний канал підтримки: Telegram Support\n ! Не взаємодійте з особами, які видають себе за підтримку. Це шахраї!\n ! Після підтвердження отримання коштів угода вважається завершеною. Блокчейн не підтримує скасування транзакцій.\n ! Ніколи не передавайте свої приватні ключі та не погоджуйтесь на сторонні перевірки.\n Ви погоджуєтеся з цими умовами?",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Так, я погоджуюсь", callback_data: "agree_buy" }],
              [{ text: "Назад", callback_data: "back" }],
            ],
          },
        }
      );
      userState[chatId] = { step: "waitingForCrypto" };
      break;
    }

    case "waitingForCrypto": {
      if (!CRYPTOS.includes(text)) {
        return sendMessage(
          chatId,
          "Виберіть криптовалюту, яку хочете купити:",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "USDT (TRC-20)", callback_data: "buy_USDT" }],
                [{ text: "USDC (TRC-20)", callback_data: "buy_USDC" }],
                [{ text: "TUSD (TRC-20)", callback_data: "buy_TUSD" }],
                [{ text: "DAI (TRC-20)", callback_data: "buy_DAI" }],
                [{ text: "Назад", callback_data: "back" }],
              ],
            },
          }
        );
      }
      userState[chatId] = {
        ...userState[chatId],
        step: "waitingForAmount",
        crypto: text,
      };
      return sendMessage(
        chatId,
        `💰 Вкажіть суму в ${text}, яку хочете купити:`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
          },
        }
      );
    }

    case "waitingForAmount": {
      const amount = parseFloat(text);
      if (isNaN(amount) || amount <= 0) {
        return sendMessage(chatId, "❌ Введіть коректну суму.");
      }
      userState[chatId] = {
        ...userState[chatId],
        step: "waitingForPrice",
        amount,
      };
      return sendMessage(
        chatId,
        `💸 Встановіть ціну в UAH за 1 ${userState[chatId].crypto}:`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
          },
        }
      );
    }

    case "waitingForPrice": {
      const price = parseFloat(text);
      if (isNaN(price) || price <= 0) {
        return sendMessage(chatId, "❌ Введіть коректну ціну.");
      }
      userState[chatId] = {
        ...userState[chatId],
        step: "waitingForPaymentMethod",
        price,
      };
      return sendMessage(chatId, "Виберіть спосіб отримання оплати:", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Збережений платіжний метод",
                callback_data: "pay_method",
              },
            ],
            [
              {
                text: "Додати новий платіжний метод",
                callback_data: "add_pay",
              },
            ],
            [{ text: "Назад", callback_data: "back" }],
          ],
        },
      });
    }

    case "showSummary": {
      const state = userState[chatId];
      return sendMessage(
        chatId,
        `📦 Ви створюєте заявку на покупку:\n\n` +
          `🔸 Криптовалюта: ${state.crypto}\n` +
          `🔸 Сума: ${state.amount}\n` +
          `🔸 Ціна: ${state.price} UAH за 1 ${state.crypto}\n\n` +
          `✅ Спосіб оплати збережено. Підтвердіть заявку або поверніться назад.`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Підтвердити заявку",
                  callback_data: "confirm_buy_order",
                },
              ],
              [{ text: "Назад", callback_data: "back" }],
            ],
          },
        }
      );
    }

    case "confirmOrder": {
      const { crypto, amount, price, paymentMethod } = currentState;

      if (!crypto || !amount || !price || !paymentMethod) {
        await sendMessage(chatId, "❌ Помилка. Неповні дані заявки.");
        break;
      }

      await saveRequest("buy", username, crypto, amount, price);

      userState[chatId] = { step: "idle" };

      await sendMessage(
        chatId,
        `✅ Ваше оголошення успішно створено!\n Оголошення N: 123456 ${amount}\n Криптовалюта: ${crypto}\n Ціна ${price}\n Валюта оплати: UAH\n Спосіб оплати: ${paymentMethod}\n Термін дії: 24 години\n Що далі?`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Мої оголошення", callback_data: "allOrders" }],
              [{ text: "💼 Гаманець", callback_data: "wallet" }],
              [
                {
                  text: "Створити ще одно оголошення",
                  callback_data: "createOrder",
                },
              ],
            ],
          },
        }
      );
      break;
    }

    default:
      break;
  }
};

export default createBuyOrder;
