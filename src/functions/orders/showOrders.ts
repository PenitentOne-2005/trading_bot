import { Pool } from "pg";
import dotenv from "dotenv";
import sendMessage from "../send/sendMessage";
import { Message } from "node-telegram-bot-api";
import { ordersMenu } from "./showOrdersKeyBoard";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const showOrders = async (msg: Message) => {
  const response = await pool.query(`SELECT * FROM sell_requests`);
  const orders = response.rows;

  if (orders.length === 0) {
    sendMessage(msg.chat.id, "📭 Пока нет заявок.");
  }

  const formattedOrders = orders.map((order) => {
    const { username, crypto, amount, status } = order;

    return `username: ${username}\ncrypto: ${crypto}\namount: ${amount}\nstatus: ${status}`;
  });

  sendMessage(msg.chat.id, `Заявки:\n${formattedOrders}`, ordersMenu);
};

export default showOrders;
