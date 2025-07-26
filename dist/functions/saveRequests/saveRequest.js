import pool from "../../db.js";
const saveRequest = async (type, username, chatId, crypto, amount, price) => {
    const tableName = type === "buy" ? "buy_requests" : "sell_requests";
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        chat_id BIGINT NOT NULL,
        buyer_chat_id BIGINT,
        username TEXT NOT NULL,
        crypto TEXT NOT NULL,
        amount NUMERIC NOT NULL,
        price DECIMAL(20,8) NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        await pool.query(`INSERT INTO ${tableName} (username, chat_id, crypto, amount, price) VALUES ($1, $2, $3, $4, $5)`, [username, chatId, crypto, amount, price]);
    }
    catch (error) {
        console.error(`❌ Ошибка при сохранении заявки на ${type === "buy" ? "покупку" : "продажу"}:`, error);
    }
};
export default saveRequest;
