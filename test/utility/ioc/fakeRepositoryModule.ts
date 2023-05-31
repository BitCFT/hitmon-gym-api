import {
  IUserRepository,
  IUserRepositoryToken,
} from "@business/repositories/user/iUserRepository";
import { Container } from "inversify";
import { userRepositoryMock } from "@test/utility/mocks/repository/userRepository.mock";

export const FakeRepositoryModule = (container: Container) => {
  container
    .bind<IUserRepository>(IUserRepositoryToken)
    .toConstantValue(userRepositoryMock);
};
