import { IAddress } from "../../interface.js";

interface IData {
  chatId: number;
  username: string;
  address: IAddress;
  encryptedPrivateKey: Promise<string>;
}

export interface ISaveUser {
  (data: IData): Promise<void>;
}
