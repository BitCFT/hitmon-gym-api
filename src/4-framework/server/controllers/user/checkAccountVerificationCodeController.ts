import { checkCodeGeneralError, userIsNotFoundError } from '@business/module/errors/user/user';
import { validationError } from '@business/module/errors/validation';
import { HttpRequest, HttpResponse, IController } from '@business/services/iController';
import { CheckAccountVerificationCodeOperator } from '@controller/operators/user/checkAccountVerificationCodeOperator';
import { InputCheckAccountVerificationCode } from '@controller/serializers/user/checkAccountVerificationCodeSerializer';
import { container } from '@shared/container';
import { badRequest, notFound, ok, serverError } from '@shared/httpHelper';
import { injectable } from 'inversify';

@injectable()
export class CheckAccountVerificationCodeController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(CheckAccountVerificationCodeOperator);
      const inputData = httpRequest.params;
      const input = new InputCheckAccountVerificationCode(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === checkCodeGeneralError) {
          throw result.value;
        }

        if (result.value === userIsNotFoundError) {
          return notFound(result.value)
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