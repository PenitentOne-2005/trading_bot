"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userState_1 = require("../../userState");
const showOrders_1 = __importDefault(require("../orders/showOrders"));
const userOffsets_1 = require("../orders/userOffsets");
const saveSellRequest_1 = __importDefault(require("../save/saveSellRequest"));
const commandKeyboard_1 = require("./commandKeyboard");
const sendMessage_1 = __importDefault(require("./sendMessage"));
const CRYPTOS = ["TRX", "USDT"];
const processUserMessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { chat, text } = msg;
    const chatId = chat.id;
    const username = chat.username;
    if (!username || !text)
        return;
    const currentState = (_a = userState_1.userState[chatId]) !== null && _a !== void 0 ? _a : { step: "idle" };
    switch (true) {
        case currentState.step === "waitingForCrypto": {
            if (!CRYPTOS.includes(text)) {
                return (0, sendMessage_1.default)(chatId, "❌ Пожалуйста, выбери криптовалюту кнопкой.");
            }
            userState_1.userState[chatId] = { step: "waitingForAmount", crypto: text };
            return (0, sendMessage_1.default)(chatId, `💰 Введи сумму ${text}, которую хочешь продать:`);
        }
        case currentState.step === "waitingForAmount": {
            const amount = parseFloat(text);
            if (isNaN(amount) || amount <= 0) {
                return (0, sendMessage_1.default)(chatId, "❌ Введи корректную сумму.");
            }
            yield (0, saveSellRequest_1.default)(username, currentState.crypto, amount);
            yield (0, sendMessage_1.default)(chatId, `✅ Заявка на продажу ${amount} ${currentState.crypto} создана!\nКак только заявка будет обработана, ты получишь уведомление!`);
            userState_1.userState[chatId] = { step: "idle" };
            return (0, sendMessage_1.default)(chatId, "🔙 Главное меню:", commandKeyboard_1.mainMenu);
        }
        case text === "/sellCrypto": {
            userState_1.userState[chatId] = { step: "waitingForCrypto" };
            return (0, sendMessage_1.default)(chatId, "🪙 Выбери криптовалюту для продажи:", {
                reply_markup: {
                    keyboard: [[{ text: "TRX" }, { text: "USDT" }], [{ text: "/back" }]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
            });
        }
        case text === "/back": {
            userState_1.userState[chatId] = { step: "idle" };
            return (0, sendMessage_1.default)(chatId, "🔙 Главное меню:", commandKeyboard_1.mainMenu);
        }
        case text === "/showOrders": {
            userOffsets_1.userOffsets[chatId] = 0;
            return (0, sendMessage_1.default)(chatId, "Заявки:");
        }
        case text === "/next": {
            userOffsets_1.userOffsets[chatId] = ((_b = userOffsets_1.userOffsets[chatId]) !== null && _b !== void 0 ? _b : 0) + 1;
            return (0, showOrders_1.default)(msg);
        }
        case !text.startsWith("/"): {
            return (0, sendMessage_1.default)(chatId, `Ты написал: ${text}`);
        }
        default:
            break;
    }
});
exports.default = processUserMessage;
