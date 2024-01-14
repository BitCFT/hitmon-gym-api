import { CreateUserGeneralError } from '@business/module/errors/user/user';
import { validationError } from '@business/module/errors/validation';
import { CreateUserOperator } from '@controller/operators/user/createUserOperator';
import { InputCreateUser } from '@controller/serializers/user/createUserSerializer';
import { IController } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { badRequest, created, serverError } from '@presentation/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class CreateUserController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(CreateUserOperator);
      const inputData = httpRequest.body;
      const input = new InputCreateUser(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === CreateUserGeneralError) {
          throw result.value;
        }
        return badRequest(result.value);
      }

      return created(result.value);
    } catch (error: any) {
      if (error?.code === validationError().code) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
