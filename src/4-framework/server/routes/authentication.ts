import { Router } from 'express';
import { AuthenticationRoutes } from '../config/systemRoutes';
import { ExpressRoutesAdapter } from '../adapters/expressRoutesAdapter';
import { container } from '@shared/container';
import { LoginController } from '@presentation/controllers/authentication/loginController';

export const authenticationRoutes = (router: Router): void => {
  router.post(AuthenticationRoutes.LOGIN, ExpressRoutesAdapter.adapt(container.get(LoginController)));
};
