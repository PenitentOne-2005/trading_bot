import { userState, UserState } from "../../userState";
import saveSellRequest from "../save/saveSellRequest";
import { mainMenu } from "./commandKeyboard";
import { IprocessUserMessage } from "./interface";
import sendMessage from "./sendMessage";

const processUserMessage: IprocessUserMessage = async (msg) => {
  const { chat, text } = msg;
  const chatId = chat.id;
  const username = chat.username;

  if (!username) return;

  if (!text) return;

  const currentState = userState[chatId] ?? ({ step: "idle" } as UserState);

  if (currentState.step === "waitingForCrypto") {
    if (!["TRX", "USDT"].includes(text)) {
      return sendMessage(chatId, "❌ Пожалуйста, выбери криптовалюту кнопкой.");
    }

    userState[chatId] = { step: "waitingForAmount", crypto: text };
    return sendMessage(
      chatId,
      `💰 Введи сумму ${text}, которую хочешь продать:`
    );
  }

  if (currentState.step === "waitingForAmount") {
    const amount = parseFloat(text || "");
    if (isNaN(amount) || amount <= 0) {
      return sendMessage(chatId, "❌ Введи корректную сумму.");
    }

    await saveSellRequest(username, currentState.crypto!, amount);
    await sendMessage(
      chatId,
      `✅ Заявка на продажу ${amount} ${currentState.crypto} создана!
      Как только заявка будет обработана, ты получишь уведомление!`
    );

    userState[chatId] = { step: "idle" };
    return sendMessage(chatId, "🔙 Главное меню:", mainMenu);
  }

  if (text === "/sellCrypto") {
    userState[chatId] = { step: "waitingForCrypto" };

    return sendMessage(chatId, "🪙 Выбери криптовалюту для продажи:", {
      reply_markup: {
        keyboard: [[{ text: "TRX" }, { text: "USDT" }], [{ text: "/back" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  if (text === "/back") {
    userState[chatId] = { step: "idle" };
    return sendMessage(chatId, "🔙 Главное меню:", mainMenu);
  }

  if (!text.startsWith("/")) {
    return sendMessage(chatId, `Ты написал: ${text}`);
  }
};

export default processUserMessage;
