export interface IGetPrivateKeyFromDB {
  (userId: number): Promise<string | null>;
}
