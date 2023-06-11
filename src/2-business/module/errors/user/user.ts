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

export const checkCodeGeneralError: IError = {
  code: '004',
  message: 'Check Account Verification Code General Error',
  shortMessage: 'checkAccountVerificationCodeGeneralError',
};

export const userAlreadyVerifiedError: IError = {
  code: '005',
  message: 'User Is Already Verified Error',
  shortMessage: 'userIsAlreadyVerifiedError',
};

export const expiredCodeError: IError = {
  code: '006',
  message: 'Expired Code Error',
  shortMessage: 'expiredCodeError',
};
