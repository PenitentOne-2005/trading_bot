import { IWaitingForCard } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { checkUserCard } from "./regExp.js";

const waitingForCard: IWaitingForCard = async (props) => {
  const { userState, chatId, text } = props;

  if (checkUserCard.test(text)) {
    const obj = JSON.stringify({ text });

    userState[chatId] = {
      ...userState[chatId],
      step: "confirmOrder",
      paymentMethod: "Картка",
    };

    const { default: showSummary } = await import(
      "../showSummary/showSummary.js"
    );
    const { default: savePayments } = await import("./savePayments.js");

    await savePayments(chatId, obj);
    return await showSummary(chatId, userState);
  }

  return sendMessage(
    chatId,
    "❌ Помилка! Невірний номер картки.\nНомер банківської картки повинен містити рівно 16 цифр без пробілів або символів.\nБудь ласка, введіть коректний номер карти:",
    {
      reply_markup: {
        inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
      },
    }
  );
};

export default waitingForCard;
