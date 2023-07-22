import {
  InputListEquipmentCategories,
  OutputListEquipmentCategories,
} from '@controller/serializers/equipmentCategory/listEquipmentCategoriesSerializer';
import { AbstractOperator } from '../abstractOperator';
import { inject, injectable } from 'inversify';
import { ListEquipmentCategoriesUseCase } from '@business/useCases/equipmentCategory/listEquipmentCategoriesUseCase';

@injectable()
export class ListEquipmentCategoriesOperator extends AbstractOperator<
  InputListEquipmentCategories,
  OutputListEquipmentCategories
> {
  public constructor(
    @inject(ListEquipmentCategoriesUseCase) private listEquipmentCategoriesUseCase: ListEquipmentCategoriesUseCase
  ) {
    super();
  }

  protected async run(input: InputListEquipmentCategories): Promise<OutputListEquipmentCategories> {
    return await this.listEquipmentCategoriesUseCase.exec(input);
  }
}
