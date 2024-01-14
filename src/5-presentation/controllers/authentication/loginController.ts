import { InvalidCredentialsError } from '@business/module/errors/authentication/authentication';
import { validationError } from '@business/module/errors/validation';
import { AuthenticationOperator } from '@controller/operators/authentication/authenticationOperator';
import { InputAuthentication } from '@controller/serializers/authentication/authenticationSerializer';
import { IController } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { badRequest, ok, serverError, unauthorized } from '@presentation/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class LoginController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(AuthenticationOperator);
      const inputData = httpRequest.body;
      const input = new InputAuthentication(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value.code === InvalidCredentialsError.code) {
          return unauthorized(result.value);
        }
        return badRequest(result.value);
      }

      return ok(result.value);
    } catch (error: any) {
      if (error?.code === validationError().code) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
