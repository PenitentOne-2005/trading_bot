import { allowedKeys, } from "./interface.js";
import { userState } from "../../userState.js";
const normalizeCrypto = (cryptoRaw) => {
    return cryptoRaw?.toLowerCase().split(" ")[0].trim();
};
const validateUserState = (chatId) => {
    const { crypto, amount, sumToPay } = userState[chatId] ?? {};
    const toLowerCrypto = normalizeCrypto(crypto);
    if (!toLowerCrypto || !allowedKeys.includes(toLowerCrypto)) {
        throw new Error(`❌ Неверная или неуказанная криптовалюта. ${toLowerCrypto}, ${amount} ${sumToPay}`);
    }
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error("❌ Неверная или неуказанная сумма.");
    }
    return { crypto: toLowerCrypto, amount, sumToPay };
};
export default validateUserState;
