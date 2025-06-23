import { IProcessUserMessage } from "./interface.js";
import ValidCommand from "./validComand.js";
import createMessageHandlers from "../messageHandlers/messageHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";
import waitingForPrice from "./waitingForPrice.js";
import waitingForAmount from "./waitingForAmount.js";
import savePayments from "./savePayments.js";
import showSummary from "../showSummary/showSummary.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import MESSAGE_TEXT from "../../contentText.js";

const greetings = process.env.GREETINGS;
if (!greetings) {
  console.error(
    "❌ GREETINGS не найден! Убедитесь, что он задан в .env файле."
  );
  process.exit(1);
}

const processUserMessage: IProcessUserMessage = async (msg) => {
  const { chat, text } = msg;
  const chatId = chat.id;

  if (!text) return;

  const currentState = userState[chatId];

  if (currentState?.step) {
    switch (currentState.step) {
      case "waitingForPrice": {
        const props = { userState, currentState, chatId, text };
        return waitingForPrice(props);
      }

      case "waitingForAmount": {
        const props = { userState, chatId, text };
        return waitingForAmount(props);
      }

      case "waitingForCard": {
        if (/^\d{16}$/.test(text)) {
          const obj = JSON.stringify({ text });

          await savePayments(chatId, obj);
          // return showSummary(chatId, userState, currentState);
          return sendMessage(chatId, "Номер картки збережено!");
        } else {
          return sendMessage(
            chatId,
            "❌ Помилка! Невірний номер картки.\nНомер банківської картки повинен містити рівно 16 цифр без пробілів або символів.\nБудь ласка, введіть коректний номер карти:",
            {
              reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
              },
            }
          );
        }
      }

      case "waitingForIBAN": {
        if (/^UA\d{2}\d{6}\d{19}$/.test(text)) {
          userState[chatId] = {
            ...userState[chatId],
            step: "waitingForIPN",
            IBANdata: {
              ...(userState[chatId]?.IBANdata || {}),
              IBAN: text,
            },
          };

          return sendMessage(
            chatId,
            "Введіть індивідуальний податковий номер (ІПН):",
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Назад", callback_data: "back" }],
                  [{ text: "Скасувати", callback_data: "back" }],
                ],
              },
            }
          );
        } else {
          return sendMessage(
            chatId,
            "❌ Помилка! Невірний формат IBAN.\nIBAN повинен починатися з 'UA' та містити 29 символів.\nБудь ласка, введіть коректний IBAN:",
            {
              reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
              },
            }
          );
        }
      }

      case "waitingForIPN": {
        if (/^[1-9]\d{9}$/.test(text)) {
          userState[chatId] = {
            ...userState[chatId],
            step: "waitingForName",
            IBANdata: {
              ...(userState[chatId]?.IBANdata || {}),
              IPN: text,
            },
          };

          return sendMessage(
            chatId,
            "Введіть прізвище, ім'я та по батькові власника рахунку:",
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Назад", callback_data: "back" }],
                  [{ text: "Скасувати", callback_data: "back" }],
                ],
              },
            }
          );
        } else {
          return sendMessage(
            chatId,
            "❌ Помилка! Неправильний формат податкового номера.\nІПН повинен містити рівно 10 цифр.\nБудь ласка, введіть коректний ІПН:",
            {
              reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
              },
            }
          );
        }
      }

      case "waitingForName": {
        if (
          /^(?:[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+ ){2}[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+$/.test(
            text
          )
        ) {
          const IBANdata = {
            ...(userState[chatId]?.IBANdata || {}),
            name: text,
          };

          userState[chatId] = {
            ...userState[chatId],
            IBANdata,
          };

          await savePayments(chatId, JSON.stringify(IBANdata));
          return showSummary(chatId, userState, currentState);
        } else {
          return sendMessage(
            chatId,
            "❌ Помилка! Невірний формат ПІБ.\nПрізвище, ім'я та по батькові повинні містити тільки літери українського або латинського алфавіту.\nПриклад: Іваненко Іван Іванович",
            {
              reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
              },
            }
          );
        }
      }

      default: {
        userState[chatId] = { step: "idle" };
        return sendMessage(
          chatId,
          "⚠️ Невідомий крок. Скиньте, будь ласка, команду ще раз."
        );
      }
    }
  }

  if (text === "/start") {
    await sendMessage(chatId, MESSAGE_TEXT.selectLang, selectLanguageBoard);

    userState[chatId] = { step: "idle" };
    return;
  }

  const handlers = createMessageHandlers(chatId);

  return text in handlers
    ? await handlers[text as ValidCommand]()
    : await sendMessage(chatId, "Невідома команда.");
};

export default processUserMessage;
