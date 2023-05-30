import { IUserEntity } from "@domain/entities/userEntity";

export const IUserRepositoryToken = Symbol.for("IUserRepositoryToken");

export type OutputFindById = IUserEntity | null;

export type OutputFindByEmail = IUserEntity | null;

export type InputCreateUser = {
  email: string;
  password: string;
  userName: string;
  accountVerificationCode: string;
  accountVerificationCodeExpiresAt: Date;
};
export interface IUserRepository {
  create(input: InputCreateUser): Promise<IUserEntity>;
  findById(id: string): Promise<OutputFindById>;
  findByEmail(id: string): Promise<OutputFindByEmail>;
}
