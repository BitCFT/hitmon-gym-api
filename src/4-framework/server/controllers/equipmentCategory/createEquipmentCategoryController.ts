import { HttpRequest, HttpResponse, IController } from '@business/services/iController';
import { CreateEquipmentCategoryOperator } from '@controller/operations/equipmentCategory/createEquipmentCategoryOperator';
import { InputCreateEquipmentCategory } from '@controller/serializers/equipmentCategory/createEquipmentCategorySerializer';
import { container } from '@shared/container';
import { injectable } from 'inversify';

@injectable()
export class CreateEquimentCategoryController implements IController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const operator = container.get(CreateEquipmentCategoryOperator);

      const inputData = {
        ...httpRequest.body,
      };

      const input = new InputCreateEquipmentCategory(inputData);

      const result = await operator.exec(input);

      if (result.isLeft()) {
        return {
          statusCode: 400,
          body: result.value,
        };
      }

      return {
        statusCode: 200,
        body: result.value,
      };
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
