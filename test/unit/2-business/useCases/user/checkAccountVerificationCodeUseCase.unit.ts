import { container } from '@test/utility/ioc/inversifyConfigTests';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import {
  checkCodeGeneralError,
  resendAccountVerificationCodeGeneralError,
  userAlreadyVerifiedError,
  userIsNotFoundError,
} from '@business/module/errors/user/user';
import { IError } from '@shared/iError';
import { left, right } from '@shared/either';
import { CheckAccountVerificationCodeUseCase } from '@business/useCases/user/checkAccountVerificationCodeUseCase';
import { InputCheckAccountVerificationCodeDto } from '@business/dto/user/checkAccountVerificationCodeDto';
import { fakeUserEntity } from '@test/utility/fakes/entities/userEntity';
import { RegistrationStep } from '@domain/entities/userEntity';

describe('2-business.useCases.user.checkAccountVerificationCodeUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(CheckAccountVerificationCodeUseCase);
  const input: InputCheckAccountVerificationCodeDto = {
    code: '1234567890',
  };

  it('should is not be able to resend code because exception in findByAccountVerificationCode method', async () => {
    jest.spyOn(userRepositoryMock, 'findByAccountVerificationCode').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(checkCodeGeneralError);
  });

  it('should calls findByAccountVerificationCode method with correct value', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'findByAccountVerificationCode');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.code);
  });

  it('should return left if user is not found', async () => {
    jest.spyOn(userRepositoryMock, 'findByAccountVerificationCode').mockImplementationOnce(async () => null);

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(userIsNotFoundError);
  });

  it('should return left if user is already verified', async () => {
    jest.spyOn(userRepositoryMock, 'findByAccountVerificationCode').mockResolvedValueOnce({
      ...fakeUserEntity,
      registrationStep: RegistrationStep.VERIFIED,
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(userAlreadyVerifiedError);
  });
});
