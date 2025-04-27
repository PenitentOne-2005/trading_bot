"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const botInstance_1 = __importDefault(require("../../botInstance"));
const sendMessage = (chatId, text, menu) => botInstance_1.default.sendMessage(chatId, text, menu);
exports.default = sendMessage;
