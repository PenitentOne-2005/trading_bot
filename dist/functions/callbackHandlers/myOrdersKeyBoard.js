export const myOrdersKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Очікують реакції", callback_data: "pending_orders" }],
            [{ text: "Активні оголошення", callback_data: "active_orders" }],
            [{ text: "Завершені", callback_data: "finished_orders" }],
            [{ text: "Створити оголошення", callback_data: "create_ad" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
