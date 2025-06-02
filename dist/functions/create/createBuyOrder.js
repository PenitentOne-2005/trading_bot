import sendMessage from "../sendMessage/sendMessage.js";
const createBuyOrder = async (props) => {
    const { currentState, CRYPTOS, text, chatId, userState, username, mainMenu } = props;
    if (!username)
        return;
    switch (currentState.step) {
        case "idle": {
            await sendMessage(chatId, "ВАЖЛИВА ІНФОРМАЦІЯ\n ! Єдиний офіційний канал підтримки: Telegram Support\n ! Не взаємодійте з особами, які видають себе за підтримку. Це шахраї!\n ! Після підтвердження отримання коштів угода вважається завершеною. Блокчейн не підтримує скасування транзакцій.\n ! Ніколи не передавайте свої приватні ключі та не погоджуйтесь на сторонні перевірки.\n Ви погоджуєтеся з цими умовами?", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Так, я погоджуюсь", callback_data: "agree_buy" }],
                        [{ text: "Назад", callback_data: "back" }],
                    ],
                },
            });
            userState[chatId] = { step: "waitingForCrypto" };
            break;
        }
        case "waitingForAmount": {
            if (typeof text !== "string") {
                return sendMessage(chatId, "❌ Введіть коректну суму.");
            }
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
            break;
    }
};
export default createBuyOrder;
