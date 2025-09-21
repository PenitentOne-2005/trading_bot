import { UserState } from "@/exports.js";

export interface PromptWithdrawAmount {
  (
    chatId: number,
    data: string,
    userState: Record<number, UserState>
  ): Promise<void>;
}
