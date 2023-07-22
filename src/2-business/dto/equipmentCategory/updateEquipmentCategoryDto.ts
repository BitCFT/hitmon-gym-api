import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputUpdateEquipmentCategoryDto = {
  id: string;
  params: Partial<Pick<IEquipmentCategoryEntity, 'name' | 'description'>>;
};

export type OutputUpdateEquipmentCategoryDto = Either<IError, IEquipmentCategoryEntity>;
