export interface Iregister {
  (chatId: number, username: string): Promise<void>;
}
