import {
  InputCheckAccountVerificationCodeDto,
  OutputCheckAccountVerificationCodeDto,
} from '@business/dto/user/checkAccountVerificationCodeDto';
import { CheckCodeGeneralError, ExpiredCodeError, UserIsNotFoundError } from '@business/module/errors/user/user';
import { IUserRepository } from '@business/repositories/user/iUserRepository';
import { IUserRepositoryToken } from '@business/repositories/user/types';
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
    @inject(IUserRepositoryToken) private readonly userRepository: IUserRepository,
    @inject(IDateServiceToken) private readonly dateService: IDateService,
    @inject(ILoggerServiceToken) private readonly logService: ILoggerService
  ) {}

  async exec(input: InputCheckAccountVerificationCodeDto): Promise<OutputCheckAccountVerificationCodeDto> {
    try {
      const user = await this.userRepository.findByAccountVerificationCode(input.code);

      if (!user) {
        return left(UserIsNotFoundError);
      }

      const isExpired = this.isAccountVerificationCodeExpired(user.accountVerificationCodeExpiresAt!);

      if (isExpired) {
        return left(ExpiredCodeError);
      }

      await this.userRepository.update(user.id, {
        accountVerificationCode: null,
        accountVerificationCodeExpiresAt: null,
        registrationStep: RegistrationStep.VERIFIED,
      });

      return right({});
    } catch (error) {
      this.logService.error(error);
      return left(CheckCodeGeneralError);
    }
  }

  private isAccountVerificationCodeExpired(date: Date): boolean {
    return this.dateService.checkIfIsAfter(new Date(), date);
  }
}
