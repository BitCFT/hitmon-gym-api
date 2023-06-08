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
