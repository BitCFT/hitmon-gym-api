import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputAuthenticationDto = {
  email: string;
  password: string;
};

export type OutputAuthenticationDto = Either<IError, { token: string }>;
