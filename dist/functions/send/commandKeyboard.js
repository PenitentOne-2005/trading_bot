export const mainMenu = {
    reply_markup: {
        keyboard: [
            [{ text: "/createWallet" }, { text: "/showBalance" }],
            [{ text: "/createExchange" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    },
};
