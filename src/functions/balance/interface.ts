export interface IgetWalletBalance {
  (chatId: number): Promise<{
    trx: number;
    usdt: number;
    usdc: number;
    tusd: number;
} | null>
}
