const { TronWeb } = require("tronweb");
import dotenv from "dotenv";
import { IsellCrypto } from "../create/interface";
import getPrivateKey from "../encrypt/encryptPrivateKey";
import getWalletBalance from "../balance/getWalletBalance";

dotenv.config();

const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS;
const QUICKNODE_RPC = process.env.QUICKNODE_RPC;

const amount = 10;

const sellCrypto: IsellCrypto = async (msg) => {
  const privateKey = getPrivateKey();

  console.log(privateKey);

  const tronWebUser = new TronWeb({
    fullHost: QUICKNODE_RPC,
    privateKey: privateKey,
  });

  const sunAmount = tronWebUser.toSun(amount);

  const balance = await getWalletBalance();

  if (balance < sunAmount) {
    console.log("Недостаточно средств на кошельке для выполнения транзакции.");
  } else {
    try {
      const transaction = await tronWebUser.trx.sendTransaction(
        ESCROW_ADDRESS,
        sunAmount
      );
      console.log("Транзакция отправлена:", transaction);
    } catch (error: any) {
      console.error(
        "Ошибка при отправке транзакции:",
        error.response ? error.response.data : error.message
      );
    }
  }
};

export default sellCrypto;
