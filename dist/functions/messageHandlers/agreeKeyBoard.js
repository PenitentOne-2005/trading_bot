export const agreeKeyBoard = {
    reply_markup: {
        inline_keyboard: [
            [{ text: "Погоджуюсь", callback_data: "agree_yes" }],
            [{ text: "Не погоджуюсь", callback_data: "agree_no" }],
        ],
    },
};
