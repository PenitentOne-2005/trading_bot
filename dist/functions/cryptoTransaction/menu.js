export const menu = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "📃 Пiдтвердити отримання грошей",
                    callback_data: "agree_get",
                },
            ],
            [{ text: "ℹ️ Моï замовлення", callback_data: "myOrders" }],
        ],
    },
};
