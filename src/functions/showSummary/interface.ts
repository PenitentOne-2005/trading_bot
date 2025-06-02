import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState";

export interface IshowSummary {
  (
    chatId: number,
    userState: Record<number, UserState>,
    currentState: UserState
  ): Promise<Message | undefined>;
}
