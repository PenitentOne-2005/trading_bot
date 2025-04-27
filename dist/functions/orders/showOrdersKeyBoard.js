"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersMenu = void 0;
exports.ordersMenu = {
    reply_markup: {
        keyboard: [
            [{ text: "/buy" }, { text: "/next" }],
            [{ text: "/back" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    },
};
