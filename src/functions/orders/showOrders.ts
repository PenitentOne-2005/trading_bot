import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const showOrders = async () => {
  const response = await pool.query(`SELECT * FROM sell_requests`);
  console.log(response.rows);
};

export default showOrders;
