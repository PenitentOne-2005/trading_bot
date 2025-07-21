export const menu = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "💼 Повернутися до гаманця",
                    callback_data: "wallet",
                },
            ],
            [{ text: "ℹ️ Переглянути оголошення", callback_data: "allOrders" }],
        ],
    },
};
