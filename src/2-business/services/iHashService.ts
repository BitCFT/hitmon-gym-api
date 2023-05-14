export const IHashServiceToken = Symbol.for("IHashServiceToken");

export interface IHashService {
  generateHash(value: string): Promise<string>;
  compareHash(value: string, hashedValue: string): Promise<boolean>;
}
