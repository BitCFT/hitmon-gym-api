import { inject, injectable } from 'inversify';
import { AbstractOperator } from '../abstractOperator';
import {
  InputDeleteEquipmentCategory,
  OutputDeleteEquipmentCategory,
} from '@controller/serializers/equipmentCategory/deleteEquipmentCategorySerializer';
import { DeleteEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/deleteEquipmentCategoryUseCase';

@injectable()
export class DeleteEquipmentCategoryOperator extends AbstractOperator<
  InputDeleteEquipmentCategory,
  OutputDeleteEquipmentCategory
> {
  public constructor(
    @inject(DeleteEquipmentCategoryUseCase) private deleteEquipmentCategoryUseCase: DeleteEquipmentCategoryUseCase
  ) {
    super();
  }

  protected async run(input: InputDeleteEquipmentCategory): Promise<OutputDeleteEquipmentCategory> {
    return await this.deleteEquipmentCategoryUseCase.exec(input);
  }
}
