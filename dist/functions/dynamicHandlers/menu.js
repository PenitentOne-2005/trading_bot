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
export const handleConfirmFiatMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "📃 Всі оголошення", callback_data: "allOrders" }],
            [{ text: "📌 Мої оголошення", callback_data: "myOrders" }],
            [{ text: "💼 Гаманець", callback_data: "wallet" }],
        ],
    },
};
