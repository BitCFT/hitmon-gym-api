import { IRandomCodeService } from '@business/services/iRandomCodeService';

export const randomCodeServiceMock: IRandomCodeService = {
  generateCode: jest.fn().mockImplementation(() => '001'),
};
