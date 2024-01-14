import { ListEquipmentsGeneralError } from '@business/module/errors/equipment/equipment';
import { validationError } from '@business/module/errors/validation';
import { ListEquipmentsOperator } from '@controller/operators/equipment/listEquipmentsOperator';
import { InputListEquipments } from '@controller/serializers/equipment/listEquipmentsSerializer';
import { IController } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { badRequest, ok, serverError } from '@presentation/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class ListEquipmentsController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(ListEquipmentsOperator);
      const { page, limit } = httpRequest.query;
      const input = new InputListEquipments({ page: Number(page), limit: Number(limit) });
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === ListEquipmentsGeneralError) {
          throw result.value;
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
