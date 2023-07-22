import { AbstractSerializer } from '../abstractSerializer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { OutputDeleteEquipmentCategoryDto } from '@business/dto/equipmentCategory/deleteEquipmentCategoryDto';

export class InputDeleteEquipmentCategory extends AbstractSerializer<InputDeleteEquipmentCategory> {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}

export type OutputDeleteEquipmentCategory = OutputDeleteEquipmentCategoryDto;
