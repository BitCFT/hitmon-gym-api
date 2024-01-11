import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export const IJwtServiceToken = Symbol.for('IJwtServiceToken');

export type InputSign = {
  id: string;
};

export type OutputSign = Either<IError, string>;

export type PayloadResult = {
  id: string;
  iat?: number;
  exp?: number;
};

export interface IJwtService {
  sign(payload: InputSign): Either<IError, string>;
  verify(token: string): Either<IError, PayloadResult>;
}
