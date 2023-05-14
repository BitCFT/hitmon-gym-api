import { IUserEntity } from "@domain/entities/userEntity";

export const IUserRepositoryToken = Symbol.for("IUserRepositoryToken");

export type OutputFindById = IUserEntity | null;

export type OutputFindByEmail = IUserEntity | null;

export interface IUserRepository {
  create(): Promise<IUserEntity>;
  findById(id: string): Promise<OutputFindById>;
  findByEmail(id: string): Promise<OutputFindByEmail>;
}
