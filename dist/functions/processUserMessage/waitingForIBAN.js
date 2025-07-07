import sendMessage from "../sendMessage/sendMessage.js";
const waitingForIBAN = (props) => {
    const { userState, chatId, text } = props;
    if (/^UA\d{2}\d{6}\d{19}$/.test(text)) {
        const prevState = userState[chatId];
        userState[chatId] = {
            ...prevState,
            step: "waitingForIPN",
            paymentMethod: "IBAN",
            IBANdata: {
                ...(prevState?.IBANdata || {}),
                IBAN: text,
            },
        };
        return sendMessage(chatId, "Введіть індивідуальний податковий номер (ІПН):", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Назад", callback_data: "back" }],
                    [{ text: "Скасувати", callback_data: "back" }],
                ],
            },
        });
    }
    else {
        return sendMessage(chatId, "❌ Помилка! Невірний формат IBAN.\nIBAN повинен починатися з 'UA' та містити 29 символів.\nБудь ласка, введіть коректний IBAN:", {
            reply_markup: {
                inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
            },
        });
    }
};
export default waitingForIBAN;
