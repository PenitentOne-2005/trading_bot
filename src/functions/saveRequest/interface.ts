type RequestType = "buy" | "sell" | undefined;

interface Props {
  orderType: RequestType;
  username: string;
  chatId: number;
  crypto: string;
  amount: number;
  price: number;
}

export interface ISaveRequest {
  (props: Props): Promise<void>;
}
