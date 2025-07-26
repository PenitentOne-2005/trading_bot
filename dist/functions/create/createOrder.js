import sendMessage from "../sendMessage/sendMessage.js";
const createOrder = (props) => {
    const { currentState, chatId, userState, username } = props;
    if (!username)
        return;
    if (currentState.step === "idle") {
        sendMessage(chatId, `ВАЖЛИВА ІНФОРМАЦІЯ\n
! Єдиний офіційний канал підтримки: Telegram Support
! Не взаємодійте з особами, які видають себе за підтримку. Це шахраї!
! Після підтвердження отримання коштів угода вважається завершеною. Блокчейн не підтримує скасування транзакцій.
! Ніколи не передавайте свої приватні ключі та не погоджуйтесь на сторонні перевірки.
Ви погоджуєтеся з цими умовами?`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Так, я погоджуюсь", callback_data: "agree_buy" }],
                    [{ text: "Назад", callback_data: "back" }],
                ],
            },
        });
        userState[chatId] = {
            ...userState[chatId],
            step: "waitingForCrypto",
        };
    }
};
export default createOrder;
