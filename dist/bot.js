"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const botInstance_1 = __importDefault(require("./botInstance"));
const registerHandler_1 = __importDefault(require("./functions/registered/registerHandler"));
const processUserMessage_1 = __importDefault(require("./functions/send/processUserMessage"));
const showWalletBalance_1 = __importDefault(require("./functions/balance/showWalletBalance"));
const greetingsMessage_1 = __importDefault(require("./functions/greetings/greetingsMessage"));
const createExchange_1 = __importDefault(require("./functions/create/createExchange"));
const buyCrypto_1 = __importDefault(require("./functions/send/buyCrypto"));
const showOrders_1 = __importDefault(require("./functions/orders/showOrders"));
botInstance_1.default.on("message", processUserMessage_1.default);
botInstance_1.default.onText(/\/createWallet/, registerHandler_1.default);
botInstance_1.default.onText(/\/showBalance/, showWalletBalance_1.default);
botInstance_1.default.onText(/\/createExchange/, createExchange_1.default);
botInstance_1.default.onText(/\/buyCrypto/, buyCrypto_1.default);
botInstance_1.default.onText(/\/showOrders/, showOrders_1.default);
botInstance_1.default.onText(/\/start/, greetingsMessage_1.default);
botInstance_1.default.on("polling_error", (error) => {
    console.error("❌ Ошибка опроса бота:", error);
});
