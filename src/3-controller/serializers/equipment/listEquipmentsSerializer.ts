import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { AbstractSerializer } from '../abstractSerializer';
import { OutputListEquipmentsDto } from '@business/dto/equipment/listEquipmentsDto';

export class InputListEquipments extends AbstractSerializer<InputListEquipments> {
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

export type OutputListEquipments = OutputListEquipmentsDto;
