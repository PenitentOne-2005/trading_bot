import { sendEscrowTRX } from "./interface.js";

const sendFromEscrowTRX: sendEscrowTRX = async (
  amount,
  buyerWallet,
  tronWebEscrow,
) => {
  try {
    const sunAmount = tronWebEscrow.toSun(amount);

    const sentTransaction = await tronWebEscrow.trx.sendTransaction(
      buyerWallet,
      Number(sunAmount),
    );

    if (!sentTransaction?.result || !sentTransaction?.txid) {
      throw new Error("sendFromEscrowTRX: Transaction failed");
    }

    return sentTransaction.txid;
  } catch (error) {
    console.error("Error in sendFromEscrowTRX:", error);
    throw error;
  }
};

export default sendFromEscrowTRX;
