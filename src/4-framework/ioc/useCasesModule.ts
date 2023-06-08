import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { ResendAccountVerificationCodeUseCase } from '@business/useCases/user/resendAccountVerificationCodeUseCase';
import { ContainerModule, interfaces } from 'inversify';

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf();
  bind(ResendAccountVerificationCodeUseCase).toSelf();
});
