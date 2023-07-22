import { AbstractSerializer } from '../abstractSerializer';
import { IsUUID } from 'class-validator';
import { OutputDeleteEquipmentCategoryDto } from '@business/dto/equipmentCategory/deleteEquipmentCategoryDto';

export class InputDeleteEquipmentCategory extends AbstractSerializer<InputDeleteEquipmentCategory> {
  @IsUUID()
  id!: string;
}

export type OutputDeleteEquipmentCategory = OutputDeleteEquipmentCategoryDto;
