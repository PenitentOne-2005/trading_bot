import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

export interface IconfirmByOrder {
  (obj: Props): Promise<Message | void>;
}

interface Props {
  currentState: UserState;
  userState: Record<number, UserState>;
  chatId: number;
  username: string;
}
