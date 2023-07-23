import { OutputListEquipmentCategoriesDto } from '@business/dto/equipmentCategory/listEquipmentCategoriesDto';
import { AbstractSerializer } from '../abstractSerializer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class InputListEquipmentCategories extends AbstractSerializer<InputListEquipmentCategories> {
  @IsNotEmpty()
  @IsInt()
  @IsPositive({
    message: 'page must only contain values greater than or equal to 1',
  })
  page!: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive({
    message: 'limit must only contain values greater than or equal to 1',
  })
  limit!: number;
}

export type OutputListEquipmentCategories = OutputListEquipmentCategoriesDto;
