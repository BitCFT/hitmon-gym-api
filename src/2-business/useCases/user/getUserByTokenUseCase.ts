import { InputGetUserByTokenDto, OutputGetUserByTokenDto } from '@business/dto/user/getUserByTokenDto';
import { GetUserByTokenGeneralError, userIsNotFoundError } from '@business/module/errors/user/user';
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { IJwtService, IJwtServiceToken } from '@business/services/iJwtService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IUseCase } from '@business/useCases/iUseCase';
import { left, right } from '@shared/either';
import { inject, injectable } from 'inversify';

@injectable()
export class GetUserByTokenUseCase implements IUseCase<InputGetUserByTokenDto, OutputGetUserByTokenDto> {
  constructor(
    @inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @inject(IJwtServiceToken)
    private readonly jwtService: IJwtService,
    @inject(ILoggerServiceToken)
    private readonly logService: ILoggerService
  ) {}

  async exec({ token }: InputGetUserByTokenDto): Promise<OutputGetUserByTokenDto> {
    try {
      const payload = this.jwtService.verify(token);

      if (payload.isLeft()) {
        return left(payload.value);
      }

      const user = await this.userRepository.findById(payload.value.id);

      if (!user) {
        return left(userIsNotFoundError);
      }

      return right(user);
    } catch (error: any) {
      this.logService.error(error);
      return left(GetUserByTokenGeneralError(error?.message));
    }
  }
}
