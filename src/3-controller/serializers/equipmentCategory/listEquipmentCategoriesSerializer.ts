import { OutputListEquipmentCategoriesDto } from '@business/dto/equipmentCategoryDto.ts/listEquipmentCategoriesDto';
import { AbstractSerializer } from '../abstractSerializer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

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
