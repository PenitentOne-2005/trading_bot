export const showPaymentSell = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Так, підтверджую",
                    callback_data: "show_payment_sell_info",
                },
            ],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
export const showPaymentBuy = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Так, переглянути реквiзити для оплати",
                    callback_data: "show_payment_buy_info",
                },
            ],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
