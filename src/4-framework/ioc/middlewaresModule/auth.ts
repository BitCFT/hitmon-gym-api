import { AuthMiddleware } from '@presentation/middlewares/auth';
import { interfaces } from 'inversify';

export const authMiddlewaresModule = (bind: interfaces.Bind) => {
  bind(AuthMiddleware).toSelf();
};
