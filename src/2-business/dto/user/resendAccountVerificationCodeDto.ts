import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputResendAccountVerificationCodeDto = {
  email: string;
};

export type OutputResendAccountVerificationCodeDto = Either<IError, {}>;
