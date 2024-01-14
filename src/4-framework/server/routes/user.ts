import { Router } from 'express';
import { UserRoutes } from '../config/systemRoutes';
import { ExpressRoutesAdapter } from '../adapters/expressRoutesAdapter';
import { container } from '@shared/container';
import { CreateUserController } from '@presentation/controllers/user/createUserController';
import { CheckAccountVerificationCodeController } from '@presentation/controllers/user/checkAccountVerificationCodeController';
import { ResendAccountVerificationCodeController } from '@presentation/controllers/user/resendAccountVerificationCodeController';

export const userRoutes = (router: Router): void => {
  router.post(UserRoutes.CREATE, ExpressRoutesAdapter.adapt(container.get(CreateUserController)));
  router.post(
    UserRoutes.CHECK_ACCOUNT_VERIFICATION_CODE,
    ExpressRoutesAdapter.adapt(container.get(CheckAccountVerificationCodeController))
  );
  router.patch(
    UserRoutes.RESEND_ACCOUNT_VERIFICATION_CODE,
    ExpressRoutesAdapter.adapt(container.get(ResendAccountVerificationCodeController))
  );
};
