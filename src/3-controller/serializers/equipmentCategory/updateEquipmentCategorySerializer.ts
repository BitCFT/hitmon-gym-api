import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { AbstractSerializer } from '../abstractSerializer';
import { OutputUpdateEquipmentCategoryDto } from '@business/dto/equipmentCategory/updateEquipmentCategoryDto';

class Params extends AbstractSerializer<Params> {
  @IsString()
  @IsOptional()
  @Length(3, 25)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(3, 100)
  description?: string;
}

export class InputUpdateEquipmentCategory extends AbstractSerializer<InputUpdateEquipmentCategory> {
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  params!: Params;
}

export type OutputUpdateEquipmentCategory = OutputUpdateEquipmentCategoryDto;
