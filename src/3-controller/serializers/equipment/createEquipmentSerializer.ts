import { AbstractSerializer } from '../abstractSerializer';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Length } from 'class-validator';
import { OutputCreateEquipmentDto } from '@business/dto/equipment/createEquipmentDto';

export class InputCreateEquipment extends AbstractSerializer<InputCreateEquipment> {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId!: string;
}

export type OutputCreateEquipment = OutputCreateEquipmentDto;
