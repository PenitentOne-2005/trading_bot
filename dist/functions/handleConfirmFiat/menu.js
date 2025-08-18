export const handleConfirmFiatMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "📃 Всі оголошення", callback_data: "allOrders" }],
            [{ text: "📌 Мої оголошення", callback_data: "myOrders" }],
            [{ text: "💼 Гаманець", callback_data: "wallet" }],
        ],
    },
};
