export const ordersKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Попередня сторінка", callback_data: "buy_crypto" },
                { text: "Наступна сторінка", callback_data: "sell_crypto" },
            ],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
