import { IprocessUserMessage } from "./interface.js";
import ValidCommand from "./validComand.js";
import createMessageHandlers from "../messageHandlers/messageHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";

const processUserMessage: IprocessUserMessage = async (msg) => {
  const { chat, text } = msg;
  const chatId = chat.id;

  if (!text) return;

  const handlers = createMessageHandlers(chatId);

  text in handlers
    ? await handlers[text as ValidCommand]()
    : sendMessage(chatId, "Невідома команда.");
};

export default processUserMessage;
