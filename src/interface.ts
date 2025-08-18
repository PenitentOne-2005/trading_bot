import { SendMessageOptions } from "node-telegram-bot-api";
import { UserState } from "@/exports.js";

export interface IAddress {
  base58: string;
  hex: string;
}

export type MenuButton = {
  text: string;
};

export interface CallbackProps {
  chatId: number;
  username: string;
  text: string;
  CRYPTOS: string[];
  userState: Record<number, UserState>;
  currentState: UserState;
  mainMenu: SendMessageOptions;
}
