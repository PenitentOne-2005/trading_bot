import { Message } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

export interface IshowSummary {
  (
    chatId: number,
    userState: Record<number, UserState>,
  ): Promise<Message | undefined>;
}
