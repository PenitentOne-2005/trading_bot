import { CallbackProps } from "../../interface.js";
import callbackHandlers from "../callbackHandlers/callbackHandlers.js";
import dynamicHandlers from "../dynamicHandlers/dynamicHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";

async function handleCallbackQuery(data: string, props: CallbackProps) {
  if (callbackHandlers[data]) {
    return callbackHandlers[data](props);
  }

  // Проверка на динамический префикс
  for (const prefix in dynamicHandlers) {
    if (data.startsWith(prefix)) {
      return dynamicHandlers[prefix](data, props);
    }
  }

  // По умолчанию — неизвестная команда
  await sendMessage(props.chatId, "❓ Невідома команда.");
}

export default handleCallbackQuery;
