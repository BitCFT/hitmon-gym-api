import { AbstractSerializer } from '../abstractSerializer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { OutputDeleteEquipmentDto } from '@business/dto/equipment/deleteEquipmentDto';

export class InputDeleteEquipment extends AbstractSerializer<InputDeleteEquipment> {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}

export type OutputDeleteEquipment = OutputDeleteEquipmentDto;
