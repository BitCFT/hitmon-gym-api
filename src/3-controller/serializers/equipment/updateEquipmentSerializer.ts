import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { AbstractSerializer } from '../abstractSerializer';
import { OutputUpdateEquipmentDto } from '@business/dto/equipment/updateEquipmentDto';

class Params extends AbstractSerializer<Params> {
  @IsString()
  @IsOptional()
  @Length(3, 25)
  name?: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}

export class InputUpdateEquipment extends AbstractSerializer<InputUpdateEquipment> {
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  params!: Params;
}

export type OutputUpdateEquipment = OutputUpdateEquipmentDto;
