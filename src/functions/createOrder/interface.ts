import { SendMessageOptions } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

interface Props {
  currentState: UserState;
  CRYPTOS: string[];
  text: string | undefined;
  chatId: number;
  userState: Record<number, UserState>;
  username: string | undefined;
  mainMenu: SendMessageOptions;
}

export interface IPropsFunc {
  (props: Props): void;
}
