import { TronWeb } from "tronweb";
import { sendEscrowTRX } from "./interface.js";

const sendFromEscrowTRX: sendEscrowTRX = async (amount, buyerWallet) => {
  try {
    const tronWebEscrow = new TronWeb({
      fullHost: "https://api.trongrid.io",
      headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
      privateKey: process.env.ESCROW_KEY!,
    });

    const sunAmount = new BigNumber(tronWebEscrow.toSun(amount));

    await tronWebEscrow.trx.sendTransaction(buyerWallet, sunAmount.toNumber());
  } catch (error) {
    console.error("Error in sendFromEscrowTRX:", error);
  }
};

export default sendFromEscrowTRX;
