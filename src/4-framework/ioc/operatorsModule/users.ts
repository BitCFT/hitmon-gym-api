import { CheckAccountVerificationCodeOperator } from '@controller/operators/user/checkAccountVerificationCodeOperator';
import { CreateUserOperator } from '@controller/operators/user/createUserOperator';
import { ResendAccountVerificationCodeOperator } from '@controller/operators/user/resendAccountVerificationCodeOperator';
import { interfaces } from 'inversify';

export const usersOperatorsModule = (bind: interfaces.Bind) => {
  bind(CreateUserOperator).toSelf();
  bind(CheckAccountVerificationCodeOperator).toSelf();
  bind(ResendAccountVerificationCodeOperator).toSelf();
};
