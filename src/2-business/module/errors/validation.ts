import { IError } from '@shared/iError';

export const validationError = (details?: any): IError => {
  return {
    code: 'val-001',
    message: 'Validation Error',
    shortMessage: 'validationError',
    details,
  };
};
