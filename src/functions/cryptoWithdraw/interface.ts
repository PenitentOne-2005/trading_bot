import { UserState } from "@/userState";
import { Message } from "node-telegram-bot-api";

interface Props {
  userState: Record<number, UserState>;
  chatId: number;
  text: string;
}

export interface CryptoWithdraw {
  (props: Props): Promise<Message>;
}
