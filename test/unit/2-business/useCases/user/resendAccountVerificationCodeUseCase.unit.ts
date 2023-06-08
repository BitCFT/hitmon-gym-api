import { container } from '@test/utility/ioc/inversifyConfigTests';
import { ResendAccountVerificationCodeUseCase } from '@business/useCases/user/resendAccountVerificationCodeUseCase';
import { InputResendAccountVerificationCodeDto } from '@business/dto/user/resendAccountVerificationCodeDto';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import { resendAccountVerificationCodeGeneralError, userIsNotFoundError } from '@business/module/errors/user/user';

describe('2-business.useCases.user.resendAccountVerificationCodeUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(ResendAccountVerificationCodeUseCase);
  const input: InputResendAccountVerificationCodeDto = {
    email: 'email@mail.com',
  };

  it('should is not be able to resend code because exception in findByEmail method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(resendAccountVerificationCodeGeneralError);
  });

  it('should calls findByEmail method with correct value', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'findByEmail');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.email);
  });

  it('should return left if user is not found', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(userIsNotFoundError);
  });
});
