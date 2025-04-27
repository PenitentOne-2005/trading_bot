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
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        telegram_id BIGINT UNIQUE NOT NULL,
        username TEXT,
        wallet_address TEXT NOT NULL,
        private_key TEXT NOT NULL
      )
    `);
        console.log("✅ Таблица users проверена/создана");
    }
    catch (error) {
        console.error("❌ Ошибка при создании таблицы:", error);
    }
});
createUsersTable();
app.get("/test-db", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT NOW()");
        res.json({ message: "База работает!", time: result.rows[0].now });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка подключения к БД" });
    }
}));
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript!");
});
app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
});
