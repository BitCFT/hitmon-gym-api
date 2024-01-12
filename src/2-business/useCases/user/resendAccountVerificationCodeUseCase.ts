import {
  InputResendAccountVerificationCodeDto,
  OutputResendAccountVerificationCodeDto,
} from '@business/dto/user/resendAccountVerificationCodeDto';
import {
  ResendAccountVerificationCodeGeneralError,
  UserAlreadyVerifiedError,
  UserIsNotFoundError,
} from '@business/module/errors/user/user';
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { IDateService, IDateServiceToken } from '@business/services/iDateService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { InputMailParams } from '@business/services/iMailTypes';
import { IQueueService, IQueueServiceToken } from '@business/services/iQueueService';
import { IRandomCodeService, IRandomCodeServiceToken } from '@business/services/iRandomCodeService';
import { IUseCase } from '@business/useCases/iUseCase';
import { RegistrationStep } from '@domain/entities/userEntity';
import { left, right } from '@shared/either';
import { inject, injectable } from 'inversify';

@injectable()
export class ResendAccountVerificationCodeUseCase
  implements IUseCase<InputResendAccountVerificationCodeDto, OutputResendAccountVerificationCodeDto>
{
  constructor(
    @inject(IUserRepositoryToken) private readonly userRepository: IUserRepository,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService,
    @inject(IRandomCodeServiceToken) private readonly randomCodeService: IRandomCodeService,
    @inject(IQueueServiceToken) private readonly queueService: IQueueService,
    @inject(IDateServiceToken) private readonly dateService: IDateService
  ) {}

  async exec(input: InputResendAccountVerificationCodeDto): Promise<OutputResendAccountVerificationCodeDto> {
    try {
      const user = await this.userRepository.findByEmail(input.email);

      if (!user) {
        return left(UserIsNotFoundError);
      }

      if (user.registrationStep === RegistrationStep.VERIFIED) {
        return left(UserAlreadyVerifiedError);
      }

      const verificationCode = this.randomCodeService.generateCode();
      const verificationCodeExpiresAt = this.dateService.addMinutesToADate(new Date(), 3);

      await this.userRepository.update(user.id, {
        accountVerificationCode: verificationCode,
        accountVerificationCodeExpiresAt: verificationCodeExpiresAt,
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

      return right({});
    } catch (error) {
      this.logService.error(error);
      return left(ResendAccountVerificationCodeGeneralError);
    }
  }
}
