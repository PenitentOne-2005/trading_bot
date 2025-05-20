export interface IisUserRegistered {
  (telegramId: number): Promise<boolean>;
}
