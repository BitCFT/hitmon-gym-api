import { InputAuthenticationDto, OutputAuthenticationDto } from '@business/dto/authentication/authenticationDto';
import {
  AuthenticationGeneralError,
  InvalidCredentialsError,
} from '@business/module/errors/authentication/authentication';
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { IHashService, IHashServiceToken } from '@business/services/iHashService';
import { IJwtService, IJwtServiceToken } from '@business/services/iJwtService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IUseCase } from '@business/useCases/iUseCase';
import { left, right } from '@shared/either';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthenticationUseCase implements IUseCase<InputAuthenticationDto, OutputAuthenticationDto> {
  constructor(
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @inject(IHashServiceToken)
    private readonly hashService: IHashService,
    @inject(IJwtServiceToken)
    private readonly jwtService: IJwtService,
    @inject(ILoggerServiceToken)
    private readonly logService: ILoggerService
  ) {}

  async exec(input: InputAuthenticationDto): Promise<OutputAuthenticationDto> {
    try {
      const user = await this.userRepository.findByEmail(input.email);

      if (!user) {
        return left(InvalidCredentialsError);
      }

      const isValidPassword = await this.hashService.compareHash(input.password, user.password);

      if (!isValidPassword) {
        return left(InvalidCredentialsError);
      }

      const token = await this.jwtService.sign({
        id: user.id,
      });

      return right({ token });
    } catch (error: any) {
      return left(AuthenticationGeneralError(error?.message));
    }
  }
}
