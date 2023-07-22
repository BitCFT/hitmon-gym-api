import { createEquipmentCategoryGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { HttpRequest, HttpResponse, IController } from '@business/services/iController';
import { CreateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/createEquipmentCategoryOperator';
import { InputCreateEquipmentCategory } from '@controller/serializers/equipmentCategory/createEquipmentCategorySerializer';
import { container } from '@shared/container';
import { badRequest, created, serverError } from '@shared/httpHelper';
import { injectable } from 'inversify';

@injectable()
export class CreateEquimentCategoryController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(CreateEquipmentCategoryOperator);
      const inputData = httpRequest.body;
      const input = new InputCreateEquipmentCategory(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === createEquipmentCategoryGeneralError) {
          throw result.value;
        }
        return badRequest(result.value);
      }

      return created(result.value);
    } catch (error: any) {
      console.log(error);
      if (error?.code === validationError().code) {
        return badRequest(error);
      }
      return serverError(error);
    }
  }
}
