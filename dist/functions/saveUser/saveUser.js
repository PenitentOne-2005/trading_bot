import pool from "../../db.js";
const saveUser = async (data) => {
    const { chat, username, address, encryptedPrivateKey } = data;
    try {
        await pool.query(`INSERT INTO users (telegram_id, username, wallet_address, private_key)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (telegram_id) DO UPDATE 
       SET wallet_address = EXCLUDED.wallet_address, 
           private_key = EXCLUDED.private_key, 
           username = EXCLUDED.username;`, [chat.id, username, address, encryptedPrivateKey]);
        console.log(`✅ Пользователь ${chat.id} сохранен`);
    }
    catch (error) {
        console.error("❌ Ошибка при сохранении пользователя:", error);
    }
};
export default saveUser;
