export interface IgetWalletBalance {
  (): Promise<{
    trx: number;
    usdt: number;
} | null>
}
