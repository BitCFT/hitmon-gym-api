import { DeleteEquipmentGeneralError, EquipmentIsNotFoundError } from '@business/module/errors/equipment/equipment';
import { validationError } from '@business/module/errors/validation';
import { DeleteEquipmentOperator } from '@controller/operators/equipment/deleteEquipmentOperator';
import { InputDeleteEquipment } from '@controller/serializers/equipment/deleteEquipmentSerializer';
import { IController } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { badRequest, noContent, notFound, serverError } from '@presentation/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class DeleteEquipmentController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(DeleteEquipmentOperator);
      const inputData = httpRequest.params;
      const input = new InputDeleteEquipment(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === DeleteEquipmentGeneralError) {
          throw result.value;
        }
        if (result.value === EquipmentIsNotFoundError) {
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
