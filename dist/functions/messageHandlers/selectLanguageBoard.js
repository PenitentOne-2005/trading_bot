export const selectLanguageBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "I speak English", callback_data: "lang_en" }],
            [{ text: "Я розмовляю українською", callback_data: "lang_ua" }],
        ],
    },
};
