export const menu = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "💼 Так, я розумію ризики",
                    callback_data: "private_key",
                },
            ],
            [{ text: "ℹ️ Скасувати", callback_data: "wallet" }],
        ],
    },
};
