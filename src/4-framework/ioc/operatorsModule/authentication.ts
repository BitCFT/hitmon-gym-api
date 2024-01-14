import { AuthenticationOperator } from '@controller/operators/authentication/authenticationOperator';
import { interfaces } from 'inversify';

export const authenticationOperatorsModule = (bind: interfaces.Bind) => {
  bind(AuthenticationOperator).toSelf();
};
