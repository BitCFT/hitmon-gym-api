import { inject, injectable } from 'inversify';
import { AbstractOperator } from '../abstractOperator';
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { InputCreateUser, OutputCreateUser } from '@controller/serializers/user/createUserSerializer';

@injectable()
export class CreateUserOperator extends AbstractOperator<InputCreateUser, OutputCreateUser> {
  public constructor(@inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase) {
    super();
  }

  protected async run(input: InputCreateUser): Promise<OutputCreateUser> {
    return await this.createUserUseCase.exec(input);
  }
}
