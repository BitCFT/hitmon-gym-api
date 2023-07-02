import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputCreateEquipmentCategoryDto = {
  name: string;
  description?: string;
};

export type OutputCreateEquipmentCategoryDto = Either<IError, IEquipmentCategoryEntity>;
