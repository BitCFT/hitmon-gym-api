import { container } from "@test/utility/ioc/inversifyConfigTests";
import { InputCreateUserDto } from "@business/dto/user/createUserDto";
import { CreateUserUseCase } from "@business/useCases/user/createUserUseCase";
import { userRepositoryMock } from "@test/utility/mocks/repository/userRepository.mock";
import { fakeUserEntity } from "@test/utility/fakes/entities/userEntity";
import { createUserGeneralError } from "@business/module/errors/user/user";

describe("2-business.useCases.user.createUserUseCase", () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(CreateUserUseCase);
  const input: InputCreateUserDto = {
    userName: "user",
    email: "email",
    password: "pass",
  };

  it("should is not be able to create user because exception in findByEmail method", async () => {
    jest.spyOn(userRepositoryMock, "findByEmail").mockImplementationOnce(() => {
      throw new Error("mocked error");
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createUserGeneralError);
  });

  it("should create user on success", async () => {
    jest
      .spyOn(userRepositoryMock, "findByEmail")
      .mockImplementationOnce(async () => null);

    const result = await useCase.exec(input);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual(fakeUserEntity);
  });
});
