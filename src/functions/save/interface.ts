import { Chat } from "node-telegram-bot-api";
import { IAddress } from "../../interface";

interface IData {
  chat: Chat;
  username: string;
  address: IAddress;
  encryptedPrivateKey: string;
}

export interface IsaveUser {
  (data: IData): Promise<void>;
}
