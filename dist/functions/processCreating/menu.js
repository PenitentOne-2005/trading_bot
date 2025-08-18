export const waitingForPriceMenu = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Збережений платіжний метод",
                    callback_data: "pay_method",
                },
            ],
            [
                {
                    text: "Додати новий платіжний метод",
                    callback_data: "add_pay",
                },
            ],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
export const menuBack = {
    reply_markup: {
        inline_keyboard: [[{ text: "Назад", callback_data: "back" }]],
    },
};
export const backSteps = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Назад", callback_data: "back" }],
            [{ text: "Скасувати", callback_data: "back" }],
        ],
    },
};
