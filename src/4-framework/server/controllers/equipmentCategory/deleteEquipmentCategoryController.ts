import {
  deleteEquipmentCategoryGeneralError,
  equipmentCategoryIsNotFoundError,
} from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { HttpRequest, HttpResponse, IController } from '@business/services/iController';
import { DeleteEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/deleteEquipmentCategoryOperator';
import { InputDeleteEquipmentCategory } from '@controller/serializers/equipmentCategory/deleteEquipmentCategorySerializer';
import { container } from '@shared/container';
import { badRequest, noContent, notFound, serverError } from '@shared/httpHelper';
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
        if (result.value.code === deleteEquipmentCategoryGeneralError().code) {
          throw result.value;
        }
        if (result.value.code === equipmentCategoryIsNotFoundError.code) {
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
