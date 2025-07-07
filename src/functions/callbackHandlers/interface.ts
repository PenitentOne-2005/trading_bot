import { Message } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

interface Props {
  chatId: number;
  savedPayment: string | null;
  userState: Record<number, UserState>;
}

export interface payMethodProps {
  (props: Props): Promise<Message | undefined>;
}
