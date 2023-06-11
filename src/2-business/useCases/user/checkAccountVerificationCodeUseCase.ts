import {
  InputCheckAccountVerificationCodeDto,
  OutputCheckAccountVerificationCodeDto,
} from '@business/dto/user/checkAccountVerificationCodeDto';
import {
  checkCodeGeneralError,
  expiredCodeError,
  userAlreadyVerifiedError,
  userIsNotFoundError,
} from '@business/module/errors/user/user';
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { IDateService, IDateServiceToken } from '@business/services/iDateService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IUseCase } from '@business/useCases/iUseCase';
import { RegistrationStep } from '@domain/entities/userEntity';
import { left, right } from '@shared/either';
import { inject, injectable } from 'inversify';

@injectable()
export class CheckAccountVerificationCodeUseCase
  implements IUseCase<InputCheckAccountVerificationCodeDto, OutputCheckAccountVerificationCodeDto>
{
  constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IDateServiceToken) private dateService: IDateService,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputCheckAccountVerificationCodeDto): Promise<OutputCheckAccountVerificationCodeDto> {
    try {
      const user = await this.userRepository.findByAccountVerificationCode(input.code);

      if (!user) {
        return left(userIsNotFoundError);
      }

      if (user.registrationStep === RegistrationStep.VERIFIED) {
        return left(userAlreadyVerifiedError);
      }

      const isExpired = this.isAccountVerificationCodeExpired(user.accountVerificationCodeExpiresAt!);

      if (isExpired) {
        return left(expiredCodeError);
      }

      await this.userRepository.update(user.id, {
        accountVerificationCode: undefined,
        accountVerificationCodeExpiresAt: undefined,
        registrationStep: RegistrationStep.VERIFIED,
      });

      return right({});
    } catch (error) {
      this.logService.error(error);
      return left(checkCodeGeneralError);
    }
  }

  private isAccountVerificationCodeExpired(date: Date): boolean {
    return this.dateService.checkIfIsAfter(new Date(), date);
  }
}
