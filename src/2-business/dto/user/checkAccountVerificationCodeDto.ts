import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputCheckAccountVerificationCodeDto = {
  code: string;
};

export type OutputCheckAccountVerificationCodeDto = Either<IError, {}>;
