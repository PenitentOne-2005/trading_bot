"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeMenu = void 0;
exports.exchangeMenu = {
    reply_markup: {
        keyboard: [
            [{ text: "/sellCrypto" }, { text: "/buyCrypto" }],
            [{ text: "/back" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    },
};
