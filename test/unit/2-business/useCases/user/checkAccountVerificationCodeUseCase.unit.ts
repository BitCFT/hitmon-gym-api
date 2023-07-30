import { container } from '@test/utility/ioc/inversifyConfigTests';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import {
  checkCodeGeneralError,
  expiredCodeError,
  userAlreadyVerifiedError,
  userIsNotFoundError,
} from '@business/module/errors/user/user';
import { CheckAccountVerificationCodeUseCase } from '@business/useCases/user/checkAccountVerificationCodeUseCase';
import { InputCheckAccountVerificationCodeDto } from '@business/dto/user/checkAccountVerificationCodeDto';
import { fakeUserEntity } from '@test/utility/fakes/entities/userEntity';
import { RegistrationStep } from '@domain/entities/userEntity';
import { dateServiceMock } from '@test/utility/mocks/service/dateService.mock';

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

  it('should is not be able to check code because exception in findByAccountVerificationCode method', async () => {
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

  it('should is not be able to check code because exception in checkIfIsAfter method', async () => {
    jest.spyOn(dateServiceMock, 'checkIfIsAfter').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(checkCodeGeneralError);
  });

  it('should calls checkIfIsAfter method with correct values', async () => {
    const fakeDate = new Date('2023-01-01T00:00:00.000Z');
    const fakeOtherDate = new Date('2023-01-01T00:03:00.000Z');

    jest.useFakeTimers().setSystemTime(fakeDate);
    jest.spyOn(userRepositoryMock, 'findByAccountVerificationCode').mockResolvedValueOnce({
      ...fakeUserEntity,
      accountVerificationCodeExpiresAt: fakeOtherDate,
    });

    const spy = jest.spyOn(dateServiceMock, 'checkIfIsAfter');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(fakeDate, fakeOtherDate);
  });

  it('should return left if verification code is expired', async () => {
    jest.spyOn(dateServiceMock, 'checkIfIsAfter').mockImplementationOnce(() => true);

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(expiredCodeError);
  });

  it('should is not be able to update user because exception in update method', async () => {
    jest.spyOn(userRepositoryMock, 'update').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(checkCodeGeneralError);
  });

  it('should calls update method with correct values', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'update');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith('string', {
      accountVerificationCode: null,
      accountVerificationCodeExpiresAt: null,
      registrationStep: RegistrationStep.VERIFIED,
    });
  });

  it('should check verification code on success', async () => {
    const result = await useCase.exec(input);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({});
  });
});
