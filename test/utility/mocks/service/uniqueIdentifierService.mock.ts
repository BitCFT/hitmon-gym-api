import { IUniqueIdentifierService } from '@business/services/iUniqueIdentifierService';

export const uniqueIdentifierMock: IUniqueIdentifierService = {
  create: jest.fn().mockImplementation(() => '0c5244eb-d80e-452c-bf99-383236161a51'),
};
