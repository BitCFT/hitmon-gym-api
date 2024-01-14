import { AuthMiddleware } from '@presentation/middlewares/auth';
import { RoleMiddlware } from '@presentation/middlewares/role';
import { ContainerModule, interfaces } from 'inversify';

export const MiddlewaresModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuthMiddleware).toSelf();
  bind(RoleMiddlware).toSelf();
});
