import { CheckAccountVerificationCodeController } from '@presentation/controllers/user/checkAccountVerificationCodeController';
import { CreateUserController } from '@presentation/controllers/user/createUserController';
import { ResendAccountVerificationCodeController } from '@presentation/controllers/user/resendAccountVerificationCodeController';
import { interfaces } from 'inversify';

export const usersControllersModule = (bind: interfaces.Bind) => {
  bind(CreateUserController).toSelf();
  bind(CheckAccountVerificationCodeController).toSelf();
  bind(ResendAccountVerificationCodeController).toSelf();
};
