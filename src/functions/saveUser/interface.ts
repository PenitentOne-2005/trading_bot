import { IAddress } from "../../interface.js";

interface IData {
  chatId: number;
  username: string;
  address: IAddress;
  encryptedKey: string;
  iv: string;
}

export interface ISaveUser {
  (data: IData): Promise<void>;
}
