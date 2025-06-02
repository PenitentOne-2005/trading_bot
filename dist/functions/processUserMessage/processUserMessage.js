import createMessageHandlers from "../messageHandlers/messageHandlers.js";
import sendMessage from "../sendMessage/sendMessage.js";
import { userState } from "../../userState.js";
const processUserMessage = async (msg) => {
    const { chat, text } = msg;
    const chatId = chat.id;
    if (!text)
        return;
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
                    step: "showSummary",
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
                return sendMessage(chatId, `💸 Встановіть ціну в UAH за 1 ${userState[chatId].crypto}:`, {
                    reply_markup: {
                        inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
                    },
                });
            }
            default:
                await sendMessage(chatId, "⚠️ Невідомий крок. Скиньте, будь ласка, команду ще раз.");
                userState[chatId] = { step: "idle" };
                break;
        }
        return;
    }
    const handlers = createMessageHandlers(chatId);
    if (text in handlers) {
        await handlers[text]();
    }
    else {
        await sendMessage(chatId, "Невідома команда.");
    }
};
export default processUserMessage;
