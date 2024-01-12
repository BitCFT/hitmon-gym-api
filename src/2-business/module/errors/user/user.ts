import { IError } from '@shared/iError';

export const CreateUserGeneralError: IError = {
  code: 'USR-001',
  message: 'Create User General Error',
  shortMessage: 'createUserGeneralError',
};

export const EmailNotAvailableError: IError = {
  code: 'USR-002',
  message: 'Email Not Available Error',
  shortMessage: 'emailNotAvailableError',
};

export const UserIsNotFoundError: IError = {
  code: 'USR-003',
  message: 'User Is Not Found Error',
  shortMessage: 'userIsNotFoundError',
};

export const ResendAccountVerificationCodeGeneralError: IError = {
  code: 'USR-004',
  message: 'Resend Account Verification Code General Error',
  shortMessage: 'resendAccountVerificationCodeGeneralError',
};

export const CheckCodeGeneralError: IError = {
  code: '004',
  message: 'Check Account Verification Code General Error',
  shortMessage: 'checkAccountVerificationCodeGeneralError',
};

export const UserAlreadyVerifiedError: IError = {
  code: 'USR-005',
  message: 'User Is Already Verified Error',
  shortMessage: 'userIsAlreadyVerifiedError',
};

export const ExpiredCodeError: IError = {
  code: 'USR-006',
  message: 'Expired Code Error',
  shortMessage: 'expiredCodeError',
};

export const GetUserByTokenGeneralError = (message?: string): IError => ({
  code: 'USR-007',
  message: message ?? 'Get User By Token General Error',
  shortMessage: 'getUserByTokenGeneralError',
});
