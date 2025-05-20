export type UserStep =
  | "idle"
  | "waitingForCrypto"
  | "waitingForAmount"
  | "waitingForPrice";

export interface UserState {
  step: UserStep;
  crypto?: string;
  amount?: number;
}

// chatId -> состояние
export const userState: Record<number, UserState> = {};
