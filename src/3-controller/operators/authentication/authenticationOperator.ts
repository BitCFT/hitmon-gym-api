import { inject, injectable } from 'inversify';
import { AbstractOperator } from '../abstractOperator';
import {
  InputAuthentication,
  OutputAuthentication,
} from '@controller/serializers/authentication/authenticationSerializer';
import { AuthenticationUseCase } from '@business/useCases/authentication/authenticationUseCase';

@injectable()
export class AuthenticationOperator extends AbstractOperator<InputAuthentication, OutputAuthentication> {
  public constructor(@inject(AuthenticationUseCase) private authentication: AuthenticationUseCase) {
    super();
  }

  protected async run(input: InputAuthentication): Promise<OutputAuthentication> {
    return await this.authentication.exec(input);
  }
}
