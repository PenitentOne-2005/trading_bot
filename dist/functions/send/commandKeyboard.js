"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = void 0;
exports.mainMenu = {
    reply_markup: {
        keyboard: [
            [{ text: "/createWallet" }, { text: "/showBalance" }],
            [{ text: "/createExchange" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    },
};
