interface IData {
  chatId: number;
  username: string;
  address: string;
  encryptedKey: string;
  iv: string;
}

export interface ISaveUser {
  (data: IData): Promise<void>;
}
