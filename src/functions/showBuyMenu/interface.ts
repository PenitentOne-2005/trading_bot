export interface IShowBuyMenu {
  (userOffsets: Record<number, number>, chatId: number): Promise<void>;
}
