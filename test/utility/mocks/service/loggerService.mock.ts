import { ILoggerService } from '@business/services/iLogger';

export const logServiceMock: ILoggerService = {
  log: jest.fn().mockResolvedValue(null),
  error: jest.fn().mockResolvedValue(null),
} as ILoggerService;
