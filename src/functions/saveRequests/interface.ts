type RequestType = "buy" | "sell" | undefined;

export interface ISaveRequest {
  (
    type: RequestType,
    username: string,
    chatId: number,
    crypto: string,
    amount: number,
    price: number
  ): Promise<void>;
}
