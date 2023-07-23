import { OutputCreateEquipmentCategoryDto } from '@business/dto/equipmentCategory/createEquipmentCategoryDto';
import { AbstractSerializer } from '../abstractSerializer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class InputCreateEquipmentCategory extends AbstractSerializer<InputCreateEquipmentCategory> {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  name!: string;

  @IsString()
  @IsOptional()
  @Length(3, 100)
  description?: string;
}

export type OutputCreateEquipmentCategory = OutputCreateEquipmentCategoryDto;
