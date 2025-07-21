import { SendMessageOptions } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

export interface IPropsFunc {
  (props: Props): void;
}

interface Props {
  currentState: UserState;
  CRYPTOS: string[];
  text: string | undefined;
  chatId: number;
  userState: Record<number, UserState>;
  username: string | undefined;
  mainMenu: SendMessageOptions;
}
