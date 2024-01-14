import { AuthenticationUseCase } from '@business/useCases/authentication/authenticationUseCase';
import { interfaces } from 'inversify';

export const authenticationUseCasesModule = (bind: interfaces.Bind) => {
  bind(AuthenticationUseCase).toSelf();
};
