import { IAddress } from "../../interface";

interface WalletData {
  privateKey: string;
  address: IAddress;
}

export interface ICreateWallet {
  (): Promise<WalletData | undefined>;
}
