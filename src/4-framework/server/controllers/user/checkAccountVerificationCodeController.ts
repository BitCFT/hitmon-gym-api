import { CheckCodeGeneralError, UserIsNotFoundError } from '@business/module/errors/user/user';
import { validationError } from '@business/module/errors/validation';
import { CheckAccountVerificationCodeOperator } from '@controller/operators/user/checkAccountVerificationCodeOperator';
import { InputCheckAccountVerificationCode } from '@controller/serializers/user/checkAccountVerificationCodeSerializer';
import { IController } from '@framework/protocols/controller';
import { HttpRequest, HttpResponse } from '@framework/protocols/http';
import { badRequest, noContent, notFound, serverError } from '@framework/protocols/httpStatus';
import { container } from '@shared/container';
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
        if (result.value === CheckCodeGeneralError) {
          throw result.value;
        }

        if (result.value === UserIsNotFoundError) {
          return notFound(result.value);
        }
        return badRequest(result.value);
      }

      return noContent(result.value);
    } catch (error: any) {
      if (error?.code === validationError().code) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
