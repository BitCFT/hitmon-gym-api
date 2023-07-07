import { inject, injectable } from 'inversify';
import { AbstractOperator } from '../abstractOperator';
import { CreateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/createEquipmentCategoryUseCase';
import {
  InputCreateEquipmentCategory,
  OutputCreateEquipmentCategory,
} from '@controller/serializers/equipmentCategory/createEquipmentCategorySerializer';

@injectable()
export class CreateEquipmentCategoryOperator extends AbstractOperator<
  InputCreateEquipmentCategory,
  OutputCreateEquipmentCategory
> {
  public constructor(
    @inject(CreateEquipmentCategoryUseCase) private createEquipmentCategoryUseCase: CreateEquipmentCategoryUseCase
  ) {
    super();
  }

  protected async run(input: InputCreateEquipmentCategory): Promise<OutputCreateEquipmentCategory> {
    return await this.createEquipmentCategoryUseCase.exec(input);
  }
}
