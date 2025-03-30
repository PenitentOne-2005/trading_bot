import { IAddress } from "../../interface";

interface WalletData {
  privateKey: string;
  address: IAddress;
}

export interface IcreateWallet {
  (): Promise<WalletData | undefined>;
}
