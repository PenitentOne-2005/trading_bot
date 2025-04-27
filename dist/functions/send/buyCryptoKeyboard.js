"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyCryptoMenu = void 0;
exports.buyCryptoMenu = {
    reply_markup: {
        keyboard: [
            [{ text: "/showOrders" }, { text: "/createOrder" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    },
};
