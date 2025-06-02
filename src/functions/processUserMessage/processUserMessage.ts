import { IprocessUserMessage } from "./interface.js";
import ValidCommand from "./validComand.js";
import createMessageHandlers from "../messageHandlers/messageHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";
import saveRequest from "../saveRequests/saveRequest.js";

const processUserMessage: IprocessUserMessage = async (msg) => {
  const { chat, text, from } = msg;
  const chatId = chat.id;
  const username = from?.username || "NoUsername";

  if (!text) return;

  const currentState = userState[chatId];

  // 🧠 Сначала проверка на FSM (если есть step)
  if (currentState?.step) {
    switch (currentState.step) {
      case "waitingForPrice": {
        const price = parseFloat(text);
        if (isNaN(price) || price <= 0) {
          return sendMessage(chatId, "❌ Введіть коректну ціну.");
        }

        userState[chatId] = {
          ...currentState,
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

      case "showSummary": {
        const state = currentState;
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
        await sendMessage(
          chatId,
          "⚠️ Невідомий крок. Скиньте, будь ласка, команду ще раз."
        );
        userState[chatId] = { step: "idle" };
        break;
    }

    return;
  }

  const handlers = createMessageHandlers(chatId);
  if (text in handlers) {
    await handlers[text as ValidCommand]();
  } else {
    await sendMessage(chatId, "Невідома команда.");
  }
};

export default processUserMessage;
