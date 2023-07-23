import { IEquipmentEntity } from '@domain/entities/equipmentEntity';
import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputUpdateEquipmentDto = {
  id: string;
  params: Partial<Pick<IEquipmentEntity, 'name' | 'categoryId' | 'price'>>;
};

export type OutputUpdateEquipmentDto = Either<IError, IEquipmentEntity>;
