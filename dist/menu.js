export const mainMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "💼 Гаманець", callback_data: "wallet" }],
            [{ text: "📃 Всі оголошення", callback_data: "allOrders" }],
            [{ text: "📌 Мої оголошення", callback_data: "myOrders" }],
            [{ text: "✏️ Створити оголошення", callback_data: "createOrder" }],
            [{ text: "ℹ️ Допомога", callback_data: "help" }],
        ],
    },
};
export const agreeKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Погоджуюсь", callback_data: "agree_yes" }],
            [{ text: "Не погоджуюсь", callback_data: "agree_no" }],
        ],
    },
};
export const helpKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Всі оголошення", callback_data: "allOrders" }],
            [{ text: "Гаманець", callback_data: "wallet" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
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
export const showOrdersKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Купити криптовалюту", callback_data: "buy_crypto" }],
            [{ text: "Продати криптовалюту", callback_data: "sell_crypto" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
export const paymentMethodKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Банківська карта", callback_data: "card" }],
            [{ text: "Банківський рахунок (IBAN)", callback_data: "IBAN" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
export const confirmPaymentNotificationKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "📌 Мої оголошення", callback_data: "myOrders" }],
            [{ text: "💼 Гаманець", callback_data: "wallet" }],
        ],
    },
};
export const showPaymentInfoKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Так, я надiслав(ла) оплату", callback_data: "agree_sent" }],
            [{ text: "Скасувати", callback_data: "cancel" }],
        ],
    },
};
export const cancelPaymentProcessKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "📃 Переглянути iншi оголошення",
                    callback_data: "allOrders",
                },
            ],
            [{ text: "💼 Повернутися до гаманця", callback_data: "wallet" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
export const setPaymentMethodKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Назад", callback_data: "back" }],
            [{ text: "Скасувати", callback_data: "back" }],
        ],
    },
};
export const agreeGetKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "📃 Всi оголошення",
                    callback_data: "allOrders",
                },
            ],
            [{ text: "ℹ️ Моï замовлення", callback_data: "myOrders" }],
            [{ text: "Гаманец", callback_data: "wallet" }],
        ],
    },
};
export const createOrderMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Купити криптовалюту", callback_data: "create_buy_crypto" }],
            [{ text: "Продати криптовалюту", callback_data: "create_sell_crypto" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
export const selectLanguageBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "I speak English", callback_data: "lang_en" }],
            [{ text: "Я розмовляю українською", callback_data: "lang_ua" }],
        ],
    },
};
export const activeOrdersMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Редагувати", callback_data: "" }],
            [{ text: "Зняти з публiкацiї", callback_data: "" }],
            [{ text: "Видалити", callback_data: "" }],
            [{ text: "Всi оголошення", callback_data: "allOrders" }],
            [{ text: "Назад", callback_data: "back" }],
        ],
    },
};
