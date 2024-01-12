import { UpdateEquipmentGeneralError } from '@business/module/errors/equipment/equipment';
import { EquipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { UpdateEquipmentOperator } from '@controller/operators/equipment/updateEquipmentOperator';
import { InputUpdateEquipment } from '@controller/serializers/equipment/updateEquipmentSerializer';
import { IController } from '@framework/protocols/controller';
import { HttpRequest, HttpResponse } from '@framework/protocols/http';
import { badRequest, notFound, ok, serverError } from '@framework/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class UpdateEquipmentController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(UpdateEquipmentOperator);
      const params = httpRequest.body;
      const { id } = httpRequest.params;
      const input = new InputUpdateEquipment({ id, params });
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === UpdateEquipmentGeneralError) {
          throw result.value;
        }

        if (result.value === EquipmentCategoryIsNotFoundError) {
          return notFound(result.value);
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
