import { resendAccountVerificationCodeGeneralError, userIsNotFoundError } from '@business/module/errors/user/user';
import { validationError } from '@business/module/errors/validation';
import { ResendAccountVerificationCodeOperator } from '@controller/operators/user/resendAccountVerificationCodeOperator';
import { InputResendAccountVerificationCode } from '@controller/serializers/user/resendAccountVerificationCodeSerializer';
import { IController } from '@framework/protocols/controller';
import { HttpRequest, HttpResponse } from '@framework/protocols/http';
import { badRequest, noContent, notFound, serverError } from '@framework/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class ResendAccountVerificationCodeController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(ResendAccountVerificationCodeOperator);
      const inputData = httpRequest.body;
      const input = new InputResendAccountVerificationCode(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === resendAccountVerificationCodeGeneralError) {
          throw result.value;
        }

        if (result.value === userIsNotFoundError) {
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
