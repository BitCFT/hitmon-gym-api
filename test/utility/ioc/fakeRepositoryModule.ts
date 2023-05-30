import {
  IUserRepository,
  IUserRepositoryToken,
} from "@business/repositories/user/iUserRepository";
import { ContainerModule, interfaces } from "inversify";
import { UserRepositoryMock } from "../mocks/repository/userRepository.mock";

export const FakeRepositoryModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IUserRepository>(IUserRepositoryToken).to(UserRepositoryMock);
  }
);
