import { IUserRepository } from '@business/repositories/user/iUserRepository';
import { fakeUserEntity } from '@test/utility/fakes/entities/userEntity';

export const userRepositoryMock: IUserRepository = {
  create: jest.fn().mockResolvedValue(fakeUserEntity),
  findById: jest.fn().mockResolvedValue(fakeUserEntity),
  findByEmail: jest.fn().mockResolvedValue(fakeUserEntity),
};
