import {
  InputUpdateEquipmentCategory,
  OutputUpdateEquipmentCategory,
} from '@controller/serializers/equipmentCategory/updateEquipmentCategorySerializer';
import { AbstractOperator } from '../abstractOperator';
import { inject, injectable } from 'inversify';
import { UpdateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/updateEquipmentCategoryUseCase';

@injectable()
export class UpdateEquipmentCategoryOperator extends AbstractOperator<
  InputUpdateEquipmentCategory,
  OutputUpdateEquipmentCategory
> {
  public constructor(
    @inject(UpdateEquipmentCategoryUseCase) private updateEquipmentCategoryUseCase: UpdateEquipmentCategoryUseCase
  ) {
    super();
  }

  protected async run(input: InputUpdateEquipmentCategory): Promise<OutputUpdateEquipmentCategory> {
    return await this.updateEquipmentCategoryUseCase.exec(input);
  }
}
