import { IProcessUserMessage } from "./interface.js";
import ValidCommand from "./validComand.js";
import createMessageHandlers from "../messageHandlers/messageHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";
import { selectLanguageBoard } from "../../selectLanguageBoard.js";
import MESSAGE_TEXT from "../../contentText.js";
import stepHandlers from "./stepHandlers.js";

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

  const props = { userState, currentState, chatId, text };

  if (currentState?.step) {
    const handler = stepHandlers[currentState.step];

    if (handler) {
      return handler(props);
    }

    userState[chatId] = { step: "idle" };
    return sendMessage(
      chatId,
      "⚠️ Невідомий крок. Скиньте, будь ласка, команду ще раз."
    );
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
