export const sellMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "USDT (TRC-20)", callback_data: "buy_USDT" }],
            [{ text: "USDC (TRC-20)", callback_data: "buy_USDC" }],
            [{ text: "TUSD (TRC-20)", callback_data: "buy_TUSD" }],
            [{ text: "DAI (TRC-20)", callback_data: "buy_DAI" }],
            [{ text: "TRX (TRC-20)", callback_data: "buy_TRX" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
