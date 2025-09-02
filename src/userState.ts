export type UserStep =
  | "idle"
  | "waitingForCrypto"
  | "waitingForAmount"
  | "waitingForPrice"
  | "waitingForPaymentMethod"
  | "waitingForWalletAddress"
  | "showSummary"
  | "confirmOrder"
  | "waitingForCard"
  | "waitingForIBAN"
  | "waitingForIPN"
  | "cryptoWithdraw"
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
  orderId?: string;
  sumToPay?: number;
  IBAN?: string;
  Name?: string;
  walletAddress?: string;
  balance?: {
    TRX: number;
    USDT: number;
    USDC: number;
    TUSD: number;
  } | null;
}

export const userState: Record<number, UserState> = {};
