import {
  InputCheckAccountVerificationCodeDto,
  OutputCheckAccountVerificationCodeDto,
} from '@business/dto/user/checkAccountVerificationCodeDto';
import { IUseCase } from '@business/useCases/iUseCase';

export class CheckAccountVerificationCodeUseCase
  implements IUseCase<InputCheckAccountVerificationCodeDto, OutputCheckAccountVerificationCodeDto>
{
  exec(input: InputCheckAccountVerificationCodeDto): Promise<OutputCheckAccountVerificationCodeDto> {
    throw new Error('Method not implemented.');
  }
}
