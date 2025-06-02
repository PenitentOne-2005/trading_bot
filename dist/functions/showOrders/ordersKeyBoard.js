export const ordersKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: "⬅️ Попередня сторінка", callback_data: "buy_crypto_prev" },
                { text: "➡️ Наступна сторінка", callback_data: "buy_crypto_next" },
            ],
            [{ text: "⬅️ Назад", callback_data: "back" }],
        ],
    },
};
