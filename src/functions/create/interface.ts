import { Message, SendMessageOptions } from "node-telegram-bot-api";
import { UserState } from "../../userState.js";

interface IPropsFunc {
  (props: Props): Promise<Message | undefined>;
}

export type ISellOrder = IPropsFunc;
export type IBuyOrder = IPropsFunc;

interface Props {
  currentState: UserState;
  CRYPTOS: string[];
  text: string | undefined;
  chatId: number;
  userState: Record<number, UserState>;
  username: string | undefined;
  mainMenu: SendMessageOptions;
}
