import { TronWeb } from "tronweb";
import dotenv from "dotenv";
import BigNumber from "bignumber.js";
import { IsellCrypto } from "../create/interface";
import getPrivateKey from "../encrypt/encryptPrivateKey";
import getWalletBalance from "../balance/getWalletBalance";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS!;
const QUICKNODE_RPC = process.env.QUICKNODE_RPC!;
const AMOUNT = 10;

const sellCrypto: IsellCrypto = async () => {
  try {
    const privateKey = getPrivateKey();
    if (!privateKey) return console.error("❌ Приватный ключ не найден");

    const tronWebUser = new TronWeb({
      fullHost: QUICKNODE_RPC,
      privateKey,
    });

    const sunAmount = new BigNumber(tronWebUser.toSun(AMOUNT));
    const userAddress = tronWebUser.defaultAddress?.base58;
    if (!userAddress)
      return console.error("❌ Не удалось получить адрес пользователя");

    const balanceRaw = await getWalletBalance();
    if (balanceRaw == null) return;

    const balance = new BigNumber(balanceRaw);
    if (balance.isLessThan(sunAmount)) {
      return console.log("❌ Недостаточно средств на кошельке.");
    }

    // Преобразуем в объект типа AddressOptions
    const addressOptions = { address: userAddress };

    // Отправляем транзакцию
    const result = await tronWebUser.trx.sendTransaction(
      ESCROW_ADDRESS, // Адрес получателя
      sunAmount.toNumber(), // Сумма в Sun
      addressOptions // Адрес отправителя (в формате AddressOptions)
    );

    console.log("✅ Транзакция отправлена:", result);
  } catch (error: any) {
    console.error(
      "❌ Ошибка при отправке транзакции:",
      error.response?.data || error.message
    );
  }
};

export default sellCrypto;
