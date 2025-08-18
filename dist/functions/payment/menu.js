export const payMethodMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Банківська карта", callback_data: "card" }],
            [{ text: "Банківський рахунок (IBAN)", callback_data: "IBAN" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
