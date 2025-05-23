import { IBuyOrder } from "./interface.js";
import sendMessage from "../sendMessage/sendMessage.js";
import saveRequest from "../saveRequests/saveRequest.js";

const createBuyOrder: IBuyOrder = async (props) => {
  const { currentState, CRYPTOS, text, chatId, userState, username, mainMenu } =
    props;

  if (!username || !text) return;

  switch (true) {
    case currentState.step === "waitingForCrypto": {
      if (!CRYPTOS.includes(text)) {
        return sendMessage(
          chatId,
          "❌ Пожалуйста, выбери криптовалюту кнопкой."
        );
      }

      userState[chatId] = { step: "waitingForAmount", crypto: text };
      return sendMessage(
        chatId,
        `💰 Введи сумму ${text}, которую хочешь купить:`
      );
    }

    case currentState.step === "waitingForAmount": {
      const amount = parseFloat(text);
      if (isNaN(amount) || amount <= 0) {
        return sendMessage(chatId, "❌ Введи корректную сумму.");
      }

      return sendMessage(chatId, `💸 Введи цену за 1 ${currentState.crypto}:`);
    }

    case currentState.step === "waitingForPrice": {
      const price = parseFloat(text);
      if (isNaN(price) || price <= 0) {
        return sendMessage(chatId, "❌ Введи корректную цену.");
      }

      await saveRequest(
        "buy",
        username,
        currentState.crypto!,
        currentState.amount!,
        price
      );

      sendMessage(
        chatId,
        `✅ Заявка на покупку ${currentState.amount} ${currentState.crypto} по цене ${price} создана!\nКак только заявка будет обработана, ты получишь уведомление!`
      );

      userState[chatId] = { step: "idle" };
      return sendMessage(chatId, "🔙 Главное меню:", mainMenu);
    }
  }
};

export default createBuyOrder;
