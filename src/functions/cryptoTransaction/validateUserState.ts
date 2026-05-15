import pool from "@/db.js";
import { allowedKeys, CryptoKey } from "@/interface.js";
import { NormalizeCrypto, ValidateUserState } from "./interface.js";

const normalizeCrypto: NormalizeCrypto = (cryptoRaw) => {
  return cryptoRaw?.split(" ")[0].trim();
};

const validateUserState: ValidateUserState = async (orderId) => {
  const sellerQuery = `SELECT crypto, amount, price FROM orders WHERE id = $1`;
  const sellerResult = await pool.query(sellerQuery, [orderId]);

  const { crypto, amount, price } = sellerResult.rows[0];

  const toLowerCrypto = normalizeCrypto(crypto);

  const sumToPay = amount * price;

  if (!toLowerCrypto || !allowedKeys.includes(toLowerCrypto as CryptoKey)) {
    throw new Error(
      `❌ Неверная или неуказанная криптовалюта. ${toLowerCrypto}, ${amount} ${sumToPay}`,
    );
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    throw new Error("❌ Неверная или неуказанная сумма.");
  }

  return {
    cryptoValidate: toLowerCrypto,
    amountValidate: amount,
    sumToPay,
  };
};

export default validateUserState;
