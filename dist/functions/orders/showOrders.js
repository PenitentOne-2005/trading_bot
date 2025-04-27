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
const db_1 = __importDefault(require("../../db"));
const userOffsets_1 = require("./userOffsets");
const sendMessage_1 = __importDefault(require("../send/sendMessage"));
const showOrdersKeyBoard_1 = require("./showOrdersKeyBoard");
const showOrders = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const offset = (_a = userOffsets_1.userOffsets[msg.chat.id]) !== null && _a !== void 0 ? _a : 0;
    const query = `SELECT * FROM sell_requests ORDER BY created_at ASC LIMIT 1 OFFSET $1`;
    const response = yield db_1.default.query(query, [offset]);
    if (response.rows.length === 0) {
        (0, sendMessage_1.default)(msg.chat.id, "📭 Пока нет заявок.");
        return;
    }
    const order = response.rows[0];
    const { username, crypto, amount, status } = order;
    const formattedOrder = `username: ${username}\ncrypto: ${crypto}\namount: ${amount}\nstatus: ${status}`;
    (0, sendMessage_1.default)(msg.chat.id, `\n${formattedOrder}`, showOrdersKeyBoard_1.ordersMenu);
});
exports.default = showOrders;
