import { CreateEquipmentCategoryGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { CreateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/createEquipmentCategoryOperator';
import { InputCreateEquipmentCategory } from '@controller/serializers/equipmentCategory/createEquipmentCategorySerializer';
import { container } from '@shared/container';
import { injectable } from 'inversify';
import { IController } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { badRequest, created, serverError } from '@presentation/protocols/httpStatus';

@injectable()
export class CreateEquimentCategoryController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(CreateEquipmentCategoryOperator);
      const inputData = httpRequest.body;
      const input = new InputCreateEquipmentCategory(inputData);
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === CreateEquipmentCategoryGeneralError) {
          throw result.value;
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
