import { Message } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

export interface NotifySeller {
  (
    userState: Record<number, UserState>,
    chatId: number
  ): Promise<Message | void>;
}
