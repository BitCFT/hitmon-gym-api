import { IEquipmentEntity } from '@domain/entities/equipmentEntity';
import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputCreateEquipmentDto = {
  name: string;
  price: number;
  categoryId: string;
};

export type OutputCreateEquipmentDto = Either<IError, IEquipmentEntity>;
