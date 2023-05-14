import { IUserEntity } from "@domain/entities/userEntity";
import { Either } from "@shared/either";
import { IError } from "@shared/iError";

export type InputCreateUserDto = Pick<
  IUserEntity,
  "email" | "password" | "userName"
>;

export type OutputCreateUserDto = Either<IError, IUserEntity>;
