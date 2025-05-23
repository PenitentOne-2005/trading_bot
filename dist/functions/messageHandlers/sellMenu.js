export const sellMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "TRX", callback_data: "sell_trx" }],
            [{ text: "USDT", callback_data: "sell_usdt" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
