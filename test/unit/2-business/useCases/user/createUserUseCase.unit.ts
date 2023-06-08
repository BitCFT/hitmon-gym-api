import { container } from '@test/utility/ioc/inversifyConfigTests';
import { InputCreateUserDto } from '@business/dto/user/createUserDto';
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import { fakeUserEntity } from '@test/utility/fakes/entities/userEntity';
import { createUserGeneralError, emailNotAvailableError } from '@business/module/errors/user/user';
import { hashServiceMock } from '@test/utility/mocks/service/hashService.mock';
import { queueServiceMock } from '@test/utility/mocks/service/queueService.mock';
import { left } from '@shared/either';
import { IError } from '@shared/iError';
import { RegistrationStep, UserEntity } from '@domain/entities/userEntity';
import { randomCodeServiceMock } from '@test/utility/mocks/service/randomCodeService.mock';

describe('2-business.useCases.user.createUserUseCase', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  const useCase = container.get(CreateUserUseCase);
  const input: InputCreateUserDto = {
    userName: 'user',
    email: 'email',
    password: 'pass',
  };

  it('should is not be able to create user because exception in findByEmail method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createUserGeneralError);
  });

  it('should calls findByEmail method with correct value', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'findByEmail');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.email);
  });

  it('should return left if email already exists', async () => {
    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(emailNotAvailableError);
  });

  it('should is not be able to create user because exception in generateHash method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    jest.spyOn(hashServiceMock, 'generateHash').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createUserGeneralError);
  });

  it('should calls generateHash method with correct value', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const spy = jest.spyOn(hashServiceMock, 'generateHash');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith(input.password);
  });

  it('should is not be able to create user because exception in generateCode method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    jest.spyOn(randomCodeServiceMock, 'generateCode').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createUserGeneralError);
  });

  it('should calls generateCode method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const spy = jest.spyOn(randomCodeServiceMock, 'generateCode');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalled();
  });

  it('should return left if on create entity returns left', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const fakeError: IError = {
      code: '000',
      message: 'fakeMessage',
      shortMessage: 'fakeShortMessage',
    };

    jest.spyOn(UserEntity, 'create').mockReturnValueOnce(left(fakeError));

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(fakeError);
  });

  it('should is not be able to create user because exception in create method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    jest.spyOn(userRepositoryMock, 'create').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createUserGeneralError);
  });

  it('should calls create method with correct values', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00.000Z'));

    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const spy = jest.spyOn(userRepositoryMock, 'create');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith({
      ...input,
      id: '0c5244eb-d80e-452c-bf99-383236161a51',
      password: 'hash',
      registrationStep: RegistrationStep.PENDING,
      accountVerificationCode: '001',
      accountVerificationCodeExpiresAt: new Date('2023-01-01T00:03:00.000Z'),
    });
  });

  it('should create user on success', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const result = await useCase.exec(input);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual(fakeUserEntity);
  });

  it('should is not be able to send data on queue because exception in sendData method', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    jest.spyOn(queueServiceMock, 'sendData').mockImplementationOnce(() => {
      throw new Error('mocked error');
    });

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(createUserGeneralError);
  });

  it('should calls sendData method with correct values', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    const spy = jest.spyOn(queueServiceMock, 'sendData');

    await useCase.exec(input);

    expect(spy).toHaveBeenCalledWith({
      url: '',
      payload: {
        to: 'string',
        subject: 'Confirm Your Account',
        body: {
          template: 'confirm-account',
          envs: {
            code: '001',
          },
        },
      },
    });
  });

  it('should return left if queue service returns left', async () => {
    const fakeIError: IError = {
      code: '000',
      message: 'Fake Message',
      shortMessage: 'fakeShortMessage',
    };

    jest.spyOn(userRepositoryMock, 'findByEmail').mockImplementationOnce(async () => null);

    jest.spyOn(queueServiceMock, 'sendData').mockResolvedValue(left(fakeIError));

    const result = await useCase.exec(input);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(fakeIError);
  });
});
