import { IProcessUserMessage } from "./interface.js";
import ValidCommand from "./validComand.js";
import createMessageHandlers from "../messageHandlers/messageHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";
import waitingForPrice from "./waitingForPrice.js";
import waitingForAmount from "./waitingForAmount.js";

const processUserMessage: IProcessUserMessage = async (msg) => {
  const { chat, text } = msg;
  const chatId = chat.id;

  if (!text) return;

  const currentState = userState[chatId];

  // 🧠 Сначала проверка на FSM (если есть step)
  if (currentState?.step) {
    switch (currentState.step) {
      case "waitingForPrice": {
        const props = {
          userState,
          currentState,
          chatId,
          text,
        };

        return waitingForPrice(props);
      }

      case "waitingForAmount": {
        const props = {
          userState,
          chatId,
          text,
        };

        return waitingForAmount(props);
      }

      default:
        sendMessage(
          chatId,
          "⚠️ Невідомий крок. Скиньте, будь ласка, команду ще раз."
        );
        userState[chatId] = { step: "idle" };
        break;
    }

    return;
  }

  const handlers = createMessageHandlers(chatId);

  text in handlers
    ? await handlers[text as ValidCommand]()
    : await sendMessage(chatId, "Невідома команда.");
};

export default processUserMessage;
