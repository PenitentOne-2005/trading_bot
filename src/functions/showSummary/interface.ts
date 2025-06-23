import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState";

export interface IshowSummary {
  (
    chatId: number,
    userState: Record<number, UserState>,
  ): Promise<Message | undefined>;
}
