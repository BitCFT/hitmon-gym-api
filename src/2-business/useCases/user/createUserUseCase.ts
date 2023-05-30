import { injectable, inject } from "inversify";
import {
  InputCreateUserDto,
  OutputCreateUserDto,
} from "@business/dto/user/createUserDto";
import { IUseCase } from "@business/useCases/iUseCase";
import {
  IUserRepository,
  IUserRepositoryToken,
} from "@business/repositories/user/iUserRepository";
import {
  IHashService,
  IHashServiceToken,
} from "@business/services/iHashService";
import {
  IRandomCodeService,
  IRandomCodeServiceToken,
} from "@business/services/iRandomCodeService";
import { left, right } from "@shared/either";
import {
  createUserGeneralError,
  emailNotAvailableError,
} from "@business/module/errors/user/user";
import { ILoggerServiceToken } from "@business/services/iLogger";
import { ILoggerService } from "@business/services/iLogger";
import { addMinutesToADate } from "@business/helpers/addMinutesToADate";

@injectable()
export class CreateUserUseCase
  implements IUseCase<InputCreateUserDto, OutputCreateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken)
    private userRepository: IUserRepository,
    @inject(IHashServiceToken) private hashService: IHashService,
    @inject(IRandomCodeServiceToken)
    private randomCodeService: IRandomCodeService,
    @inject(ILoggerServiceToken) private logService: ILoggerService
  ) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const emailAlreadyExists = await this.userRepository.findByEmail(
        input.email
      );

      if (emailAlreadyExists) {
        return left(emailNotAvailableError);
      }

      const hashedPassword = await this.hashService.generateHash(
        input.password
      );

      const accountVerificationCode = this.randomCodeService.generateCode();
      const accountVerificationCodeExpiresAt = addMinutesToADate(new Date(), 3);

      const user = await this.userRepository.create({
        ...input,
        password: hashedPassword,
        accountVerificationCode,
        accountVerificationCodeExpiresAt,
      });

      return right(user);
    } catch (error) {
      this.logService.error(error);
      return left(createUserGeneralError);
    }
  }
}
