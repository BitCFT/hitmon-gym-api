import {
  DeleteEquipmentCategoryGeneralError,
  EquipmentCategoryIsNotFoundError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { DeleteEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/deleteEquipmentCategoryOperator';
import { InputDeleteEquipmentCategory } from '@controller/serializers/equipmentCategory/deleteEquipmentCategorySerializer';
import { IController } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { badRequest, noContent, notFound, serverError } from '@presentation/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class DeleteEquimentCategoryController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(DeleteEquipmentCategoryOperator);
      const inputData = httpRequest.params;
      const input = new InputDeleteEquipmentCategory(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value.code === DeleteEquipmentCategoryGeneralError().code) {
          throw result.value;
        }
        if (result.value.code === EquipmentCategoryIsNotFoundError.code) {
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
