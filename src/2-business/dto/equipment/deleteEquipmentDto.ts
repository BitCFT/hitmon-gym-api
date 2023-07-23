import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputDeleteEquipmentDto = {
  id: string;
};

export type OutputDeleteEquipmentDto = Either<IError, undefined>;
