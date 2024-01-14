import { CheckAccountVerificationCodeUseCase } from '@business/useCases/user/checkAccountVerificationCodeUseCase';
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { GetUserByTokenUseCase } from '@business/useCases/user/getUserByTokenUseCase';
import { ResendAccountVerificationCodeUseCase } from '@business/useCases/user/resendAccountVerificationCodeUseCase';
import { interfaces } from 'inversify';

export const usersUseCasesModule = (bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf();
  bind(ResendAccountVerificationCodeUseCase).toSelf();
  bind(CheckAccountVerificationCodeUseCase).toSelf();
  bind(GetUserByTokenUseCase).toSelf();
};
