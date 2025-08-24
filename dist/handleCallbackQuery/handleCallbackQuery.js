import { dynamicHandlers, callbackHandlers } from "../exports.js";
import { sendMessage } from "../functions";
async function handleCallbackQuery(data, props) {
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
