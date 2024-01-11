import { IUserEntity } from '@domain/entities/userEntity';
import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputGetUserByTokenDto = {
  token: string;
};

export type OutputGetUserByTokenDto = Either<IError, Omit<IUserEntity, 'password'>>;
