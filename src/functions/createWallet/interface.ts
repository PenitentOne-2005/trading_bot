import { IAddress } from "@/exports.js";

interface WalletData {
  privateKey: string;
  address: IAddress;
}

export interface ICreateWallet {
  (): Promise<WalletData | undefined>;
}
