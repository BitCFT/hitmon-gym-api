import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputDeleteEquipmentCategoryDto = {
  id: string;
};

export type OutputDeleteEquipmentCategoryDto = Either<IError, undefined>;
