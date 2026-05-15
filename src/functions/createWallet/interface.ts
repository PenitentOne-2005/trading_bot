interface WalletData {
  privateKey: string;
  address: string;
}

export interface ICreateWallet {
  (): Promise<WalletData | undefined>;
}
