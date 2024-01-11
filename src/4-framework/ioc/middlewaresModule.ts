import { AuthMiddleware } from '@framework/middlewares/auth';
import { RoleMiddlware } from '@framework/middlewares/role';
import { ContainerModule, interfaces } from 'inversify';

export const MiddlewaresModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AuthMiddleware).toSelf();
  bind(RoleMiddlware).toSelf();
});
