import { RoleMiddlware } from '@presentation/middlewares/role';
import { interfaces } from 'inversify';

export const roleMiddlewaresModule = (bind: interfaces.Bind) => {
  bind(RoleMiddlware).toSelf();
};
