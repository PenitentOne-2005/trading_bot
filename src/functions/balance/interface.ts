export interface IgetWalletBalance {
  (chatId: number): Promise<{
    trx: number;
    usdt: number;
    usdc: number;
    tusd: number;
    dai: number;
} | null>
}
