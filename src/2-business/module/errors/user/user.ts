import { IError } from '@shared/iError';

export const createUserGeneralError: IError = {
  code: '001',
  message: 'Create User General Error',
  shortMessage: 'createUserGeneralError',
};

export const emailNotAvailableError: IError = {
  code: '002',
  message: 'Email Not Available Error',
  shortMessage: 'emailNotAvailableError',
};

export const userIsNotFoundError: IError = {
  code: '003',
  message: 'User Is Not Found Error',
  shortMessage: 'userIsNotFoundError',
};

export const resendAccountVerificationCodeGeneralError: IError = {
  code: '004',
  message: 'Resend Account Verification Code General Error',
  shortMessage: 'resendAccountVerificationCodeGeneralError',
};
