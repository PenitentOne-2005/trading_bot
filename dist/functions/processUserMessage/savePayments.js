import pool from "../../db";
const savePayments = async (chatId, metadata) => {
    try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS payments (
            id SERIAL PRIMARY KEY,
            telegram_id BIGINT UNIQUE,
            metadata TEXT
          );
        `);
        await pool.query(`INSERT INTO users (telegram_id, metadata)
           VALUES ($1, $2)
          `, [chatId, metadata]);
        console.log(`✅ Пользователь ${chatId} сохранён.`);
    }
    catch (error) {
        console.error("❌ Ошибка при сохранении пользователя:", error);
    }
};
export default savePayments;
