import { listEquipmentCategoriesGeneralError } from '@business/module/errors/equipmentCategory/equipmentCategory';
import { validationError } from '@business/module/errors/validation';
import { HttpRequest, HttpResponse, IController } from '@business/services/iController';
import { ListEquipmentCategoriesOperator } from '@controller/operators/equipmentCategory/listEquipmentCategoriesOperator';
import { InputListEquipmentCategories } from '@controller/serializers/equipmentCategory/listEquipmentCategoriesSerializer';
import { container } from '@shared/container';
import { badRequest, ok, serverError } from '@shared/httpHelper';
import { injectable } from 'inversify';

@injectable()
export class ListEquipmentCategoriesController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(ListEquipmentCategoriesOperator);
      const { page, limit } = httpRequest.query;
      const input = new InputListEquipmentCategories({ page: Number(page), limit: Number(limit) });
      const result = await operator.exec(input);

      if (result.isLeft()) {
        if (result.value === listEquipmentCategoriesGeneralError) {
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