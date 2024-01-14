import { LoginController } from '@presentation/controllers/authentication/loginController';
import { interfaces } from 'inversify';

export const authenticationControllersModule = (bind: interfaces.Bind) => {
  bind(LoginController).toSelf();
};
