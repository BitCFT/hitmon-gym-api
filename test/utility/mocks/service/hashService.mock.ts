import { IHashService } from '@business/services/iHashService';

export const hashServiceMock: IHashService = {
  generateHash: jest.fn().mockResolvedValue('hash'),
  compareHash: jest.fn().mockResolvedValue(true),
};
