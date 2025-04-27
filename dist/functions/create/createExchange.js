"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendMessage_1 = __importDefault(require("../send/sendMessage"));
const commandKeyboard_1 = require("./commandKeyboard");
const createExchange = (msg) => {
    (0, sendMessage_1.default)(msg.chat.id, "Выберите опцию:", commandKeyboard_1.exchangeMenu);
};
exports.default = createExchange;
