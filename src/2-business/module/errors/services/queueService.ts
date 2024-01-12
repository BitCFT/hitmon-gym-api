import { IError } from '@shared/iError';

export const SendDataQueueServiceError = (message?: string): IError => ({
  code: 'QSE-001',
  message: message ?? 'Send Data Queue Service Error',
  shortMessage: 'sendDataQueueServiceError',
});
