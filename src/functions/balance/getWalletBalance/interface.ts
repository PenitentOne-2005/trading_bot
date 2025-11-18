export interface IgetWalletBalance {
  (chatId: number): Promise<{
    TRX: number;
    USDT: number;
    USDC: number;
    TUSD: number;
  } | null>;
}
