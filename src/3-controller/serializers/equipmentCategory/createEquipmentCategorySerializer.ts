import { OutputCreateEquipmentCategoryDto } from '@business/dto/equipmentCategoryDto.ts/createEquipmentCategoryDto';
import { AbstractSerializer } from '../abstractSerializer';
import { IsOptional, IsString, Length } from 'class-validator';

export class InputCreateEquipmentCategory extends AbstractSerializer<InputCreateEquipmentCategory> {
  @IsString()
  @Length(3, 25)
  name!: string;

  @IsString()
  @IsOptional()
  @Length(3, 100)
  description?: string;
}

export type OutputCreateEquipmentCategory = OutputCreateEquipmentCategoryDto;
