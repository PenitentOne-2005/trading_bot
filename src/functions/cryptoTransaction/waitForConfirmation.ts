import { TronWeb } from "tronweb";

const waitForConfirmation = async (
  tronWeb: TronWeb,
  txid: string,
  retries = 100,
  interval = 5000,
) => {
  for (let i = 0; i < retries; i++) {
    const tx = await tronWeb.trx.getTransaction(txid);

    const status = tx?.ret?.[0]?.contractRet;

    if (status === "SUCCESS") {
      return tx;
    }

    if (status === "REVERT") {
      throw new Error("Transaction reverted");
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error("Transaction not confirmed");
};

export default waitForConfirmation;
