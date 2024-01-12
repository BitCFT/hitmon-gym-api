import { CreateEquipmentGeneralError } from '@business/module/errors/equipment/equipment';
import { EquipmentCategoryIsNotFoundError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { CreateEquipmentOperator } from '@controller/operators/equipment/createEquipmentOperator';
import { InputCreateEquipment } from '@controller/serializers/equipment/createEquipmentSerializer';
import { IController } from '@framework/protocols/controller';
import { HttpResponse, HttpRequest } from '@framework/protocols/http';
import { notFound, badRequest, created, serverError } from '@framework/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class CreateEquipmentController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(CreateEquipmentOperator);
      const inputData = httpRequest.body;
      const { id } = httpRequest.params;
      const input = new InputCreateEquipment({ id, ...inputData });
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === CreateEquipmentGeneralError) {
          throw result.value;
        }
        if (result.value === EquipmentCategoryIsNotFoundError) {
          return notFound(result.value);
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
