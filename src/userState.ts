export type UserStep = "idle" | "waitingForCrypto" | "waitingForAmount";

export interface UserState {
  step: UserStep;
  crypto?: string;
}

// chatId -> состояние
export const userState: Record<number, UserState> = {};
