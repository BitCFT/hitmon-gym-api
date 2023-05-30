import { container } from "@test/utility/ioc/inversifyConfigTests";
import { InputCreateUserDto } from "@business/dto/user/createUserDto";
import { CreateUserUseCase } from "@business/useCases/user/createUserUseCase";

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

  test("ensure 1 + 1 to be 2", async () => {
    expect(1 + 1).toBe(2);
  });
});
