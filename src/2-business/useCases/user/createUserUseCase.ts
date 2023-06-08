import { injectable, inject } from 'inversify';
import { InputCreateUserDto, OutputCreateUserDto } from '@business/dto/user/createUserDto';
import { IUseCase } from '@business/useCases/iUseCase';
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { IHashService, IHashServiceToken } from '@business/services/iHashService';
import { IRandomCodeService, IRandomCodeServiceToken } from '@business/services/iRandomCodeService';
import { left, right } from '@shared/either';
import { createUserGeneralError, emailNotAvailableError } from '@business/module/errors/user/user';
import { ILoggerServiceToken, ILoggerService } from '@business/services/iLogger';
import { addMinutesToADate } from '@business/helpers/addMinutesToADate';
import { IQueueService, IQueueServiceToken } from '@business/services/iQueueService';
import { InputMailParams } from '@business/services/iMailTypes';
import { RegistrationStep, UserEntity } from '@domain/entities/userEntity';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IHashServiceToken) private hashService: IHashService,
    @inject(IRandomCodeServiceToken) private randomCodeService: IRandomCodeService,
    @inject(ILoggerServiceToken) private logService: ILoggerService,
    @inject(IQueueServiceToken) private queueService: IQueueService,
    @inject(IUniqueIdentifierServiceToken) private uniqueIdentifierService: IUniqueIdentifierService
  ) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const emailAlreadyExists = await this.userRepository.findByEmail(input.email);

      if (emailAlreadyExists) {
        return left(emailNotAvailableError);
      }

      const hashedPassword = await this.hashService.generateHash(input.password);
      const verificationCode = this.randomCodeService.generateCode();
      const verificationCodeExpiresAt = addMinutesToADate(new Date(), 3);

      const userEntity = UserEntity.create({
        ...input,
        id: this.uniqueIdentifierService.create(),
        password: hashedPassword,
        registrationStep: RegistrationStep.PENDING,
        accountVerificationCode: verificationCode,
        accountVerificationCodeExpiresAt: verificationCodeExpiresAt,
      });

      if (userEntity.isLeft()) {
        return left(userEntity.value);
      }

      const {
        id,
        email,
        accountVerificationCode,
        accountVerificationCodeExpiresAt,
        userName,
        password,
        registrationStep,
      } = userEntity.value.export();

      const user = await this.userRepository.create({
        id,
        email,
        userName,
        password,
        accountVerificationCode: accountVerificationCode || verificationCode,
        accountVerificationCodeExpiresAt: accountVerificationCodeExpiresAt || verificationCodeExpiresAt,
        registrationStep,
      });

      const queueResponse = await this.queueService.sendData<InputMailParams<'confirm-account'>>({
        url: process.env.SEND_WELCOME_EMAIL || '',
        payload: {
          to: user.email,
          subject: 'Confirm Your Account',
          body: {
            template: 'confirm-account',
            envs: {
              code: verificationCode,
            },
          },
        },
      });

      if (queueResponse.isLeft()) {
        return left(queueResponse.value);
      }

      return right(user);
    } catch (error) {
      this.logService.error(error);
      return left(createUserGeneralError);
    }
  }
}
