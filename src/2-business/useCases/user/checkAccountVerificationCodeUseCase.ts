import {
  InputCheckAccountVerificationCodeDto,
  OutputCheckAccountVerificationCodeDto,
} from '@business/dto/user/checkAccountVerificationCodeDto';
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { IUseCase } from '@business/useCases/iUseCase';
import { inject, injectable } from 'inversify';

@injectable()
export class CheckAccountVerificationCodeUseCase
  implements IUseCase<InputCheckAccountVerificationCodeDto, OutputCheckAccountVerificationCodeDto>
{
  constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputCheckAccountVerificationCodeDto): Promise<OutputCheckAccountVerificationCodeDto> {
    throw new Error('Method not implemented.');
  }
}
