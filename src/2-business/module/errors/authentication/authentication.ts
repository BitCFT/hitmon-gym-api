import { IError } from '@shared/iError';

export const AuthenticationGeneralError = (message?: string): IError => ({
  code: 'AUTH-001',
  message: message ?? 'Authentication General Error',
  shortMessage: 'authenticationGeneralError',
});

export const InvalidCredentialsError: IError = {
  code: 'AUTH-002',
  message: 'Invalid Credentials Error',
  shortMessage: 'invalidCredentialsError',
};
