export type UserStep =
  | "idle"
  | "waitingForCrypto"
  | "waitingForAmount"
  | "waitingForPrice"
  | "waitingForPaymentMethod"
  | "showSummary"
  | "confirmOrder"
  | "waitingForCard"
  | "waitingForIBAN"
  | "waitingForIPN"
  | "waitingForName";

export interface IBANData {
  IBAN?: string;
  IPN?: string;
  name?: string;
}

export interface UserState {
  step: UserStep;
  crypto?: string;
  amount?: number;
  method?: string;
  price?: number;
  paymentMethod?: string;
  IBANdata?: IBANData;
  currentDb?: string;
  orderType?: "buy" | "sell";
}

export const userState: Record<number, UserState> = {};
