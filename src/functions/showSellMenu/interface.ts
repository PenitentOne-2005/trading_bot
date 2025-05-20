export interface IShowSellMenu {
  (userOffsets: Record<number, number>, chatId: number): Promise<void>;
}
