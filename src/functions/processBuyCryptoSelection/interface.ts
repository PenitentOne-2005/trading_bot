import { Message } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

export interface Props {
  (
    data: string | undefined,
    chatId: number,
    userState: Record<number, UserState>
  ): Promise<Message>;
}
