import sendMessage from "../sendMessage/sendMessage.js";
const waitingForIPN = (props) => {
    const { userState, chatId, text } = props;
    if (/^[1-9]\d{9}$/.test(text)) {
        const prevState = userState[chatId];
        userState[chatId] = {
            ...prevState,
            step: "waitingForName",
            IBANdata: {
                ...(prevState?.IBANdata || {}),
                IPN: text,
            },
        };
        return sendMessage(chatId, "Введіть прізвище, ім'я та по батькові власника рахунку:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Назад", callback_data: "back" }],
                    [{ text: "Скасувати", callback_data: "back" }],
                ],
            },
        });
    }
    else {
        return sendMessage(chatId, "❌ Помилка! Неправильний формат податкового номера.\nІПН повинен містити рівно 10 цифр.\nБудь ласка, введіть коректний ІПН:", {
            reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
            },
        });
    }
};
export default waitingForIPN;
