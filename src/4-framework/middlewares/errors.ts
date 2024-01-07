import { IError } from '@shared/iError';

export const AuthorizationHeaderNotProvided: IError = {
  code: 'AUTH-001',
  message: 'Authorization Header Required',
  shortMessage: 'authorizationHeaderRequired',
};

export const TokenNotProvided: IError = {
  code: 'AUTH-002',
  message: 'Authentication Token Is Required',
  shortMessage: 'AuthenticationTokenIsRequired',
};

export const AuthorizationGeneralError: IError = {
  code: 'AUTH-003',
  message: 'Authorization General Error, Please try again later',
  shortMessage: 'authorizationGeneralError',
};
