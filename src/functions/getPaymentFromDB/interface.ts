export interface IgetPaymentFromDB {
  (chatId: number): Promise<string | null>;
}
