export interface IgetWalletAddress {
  (chatId: number): Promise<string | undefined>;
}
