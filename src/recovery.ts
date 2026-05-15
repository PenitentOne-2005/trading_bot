import { TronWeb } from "tronweb";
import pool from "./db.js";

const recoverTable = async () => {
  const tronWebEscrow = new TronWeb({
    fullHost: "https://api.shasta.trongrid.io",
    headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
    privateKey: process.env.ESCROW_KEY_TEST || "",
  });

  await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        chat_id BIGINT NOT NULL,
        buyer_chat_id BIGINT,
        username TEXT NOT NULL,
        crypto TEXT NOT NULL,
        amount NUMERIC NOT NULL,
        price DECIMAL(20,8) NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        txid TEXT
      )
    `);

  const { rows } = await pool.query(`
    SELECT id, txid
    FROM orders
    WHERE status = 'processing'
    AND txid IS NOT NULL
  `);

  for (const order of rows) {
    try {
      const txInfo = await tronWebEscrow.trx.getTransactionInfo(order.txid);

      // 1️⃣ Если транзакция ещё не найдена — пропускаем
      if (!txInfo) continue;

      // 2️⃣ Если нет receipt — ещё не подтверждена
      if (!txInfo.receipt) continue;

      if (txInfo.receipt.result === "SUCCESS") {
        await pool.query(
          `
          UPDATE orders
          SET status = 'completed'
          WHERE id = $1
          AND status = 'processing'
          `,
          [order.id],
        );
      }

      if (txInfo.receipt.result === "FAILED") {
        await pool.query(
          `
          UPDATE orders
          SET status = 'waiting'
          WHERE id = $1
          AND status = 'processing'
          `,
          [order.id],
        );
      }
    } catch (error) {
      console.error("recoverTable: Recovery error for order:", order.id, error);
    }
  }
};

export default recoverTable;
