import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState";

interface Props {
  chatId: number;
  text: string;
  CRYPTOS: string[];
  userState: Record<number, UserState>;
}

export interface IhandleCryptoSelection {
  (obj: Props): Promise<Message | undefined>;
}
