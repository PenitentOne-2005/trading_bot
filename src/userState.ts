export type UserStep =
  | "idle"
  | "waitingForCrypto"
  | "waitingForAmount"
  | "waitingForPrice"
  | "waitingForPaymentMethod"
  | "showSummary"
  | "confirmOrder";

export interface UserState {
  step: UserStep;
  crypto?: string;
  amount?: number;
  method?: string;
  price?: number;
  paymentMethod?: string;
}

// chatId -> состояние
export const userState: Record<number, UserState> = {};
