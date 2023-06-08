import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { ContainerModule, interfaces } from 'inversify';

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).to(CreateUserUseCase);
});
