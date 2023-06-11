import { IDateService } from '@business/services/iDateService';

export const dateServiceMock: IDateService = {
  addMinutesToADate: jest.fn().mockImplementation(() => new Date()),
  checkIfIsAfter: jest.fn().mockImplementation(() => false),
};
