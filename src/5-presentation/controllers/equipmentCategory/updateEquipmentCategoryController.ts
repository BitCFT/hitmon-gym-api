import { UpdateEquipmentCategoryGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { UpdateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/updateEquipmentCategoryOperator';
import { InputUpdateEquipmentCategory } from '@controller/serializers/equipmentCategory/updateEquipmentCategorySerializer';
import { IController } from '@presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { badRequest, ok, serverError } from '@presentation/protocols/httpStatus';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class UpdateEquipmentCategoryController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(UpdateEquipmentCategoryOperator);
      const params = httpRequest.body;
      const { id } = httpRequest.params;
      const input = new InputUpdateEquipmentCategory({ id, params });
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === UpdateEquipmentCategoryGeneralError) {
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
