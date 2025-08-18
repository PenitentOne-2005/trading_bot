import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

export interface FuncInfoProps {
  (
    userState: Record<number, UserState>,
    chatId: number,
    orderId?: string
  ): Promise<Message | undefined>;
}
