import {
  IUserRepository,
  InputCreateUser,
  OutputFindByEmail,
  OutputFindById,
} from "@business/repositories/user/iUserRepository";
import { IUserEntity } from "@domain/entities/userEntity";
import { injectable } from "inversify";
import { fakeUserEntity } from "@test/utility/fakes/entities/userEntity";

@injectable()
export class UserRepositoryMock implements IUserRepository {
  async create(input: InputCreateUser): Promise<IUserEntity> {
    return fakeUserEntity;
  }

  async findById(id: string): Promise<OutputFindById> {
    return fakeUserEntity;
  }

  async findByEmail(email: string): Promise<OutputFindByEmail> {
    return fakeUserEntity;
  }
}
