import pool from "../../db.js";

const savePayments = async (chatId: number, metadata: any) => {
  try {
    await pool.query(`
          CREATE TABLE IF NOT EXISTS payments (
            id SERIAL PRIMARY KEY,
            telegram_id BIGINT UNIQUE,
            metadata TEXT
          );
        `);
    await pool.query(
      `INSERT INTO payments (telegram_id, metadata)
           VALUES ($1, $2)
           ON CONFLICT (telegram_id) DO UPDATE
           SET metadata = EXCLUDED.metadata
          `,
      [chatId, metadata]
    );
    console.log(`✅ Пользователь ${chatId} сохранён.`);
  } catch (error) {
    console.error("❌ Ошибка при сохранении пользователя:", error);
  }
};

export default savePayments;
