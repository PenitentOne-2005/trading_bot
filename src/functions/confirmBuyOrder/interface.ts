import { Message } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

interface Props {
  userState: Record<number, UserState>;
  chatId: number;
  username: string;
}

export interface IconfirmByOrder {
  (obj: Props): Promise<Message | void>;
}
