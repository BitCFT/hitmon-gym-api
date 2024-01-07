import { AuthMiddleware } from '@framework/middlewares/auth';
import { ContainerModule, interfaces } from 'inversify';

export const MiddlewaresModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuthMiddleware).toSelf();
});
