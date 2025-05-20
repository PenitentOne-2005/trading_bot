type RequestType = "buy" | "sell";

export interface ISaveRequest {
  (
    type: RequestType,
    username: string,
    crypto: string,
    amount: number,
    price: number
  ): Promise<void>;
}
