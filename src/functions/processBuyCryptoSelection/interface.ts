import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState";

export interface Props {
  (
    data: string | undefined,
    chatId: number,
    userState: Record<number, UserState>
  ): Promise<Message>;
}
