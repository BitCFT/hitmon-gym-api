import { IEquipmentEntity } from '@domain/entities/equipmentEntity';
import { PaginationData, PaginationParams } from '@domain/pagination';
import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputListEquipmentsDto = PaginationParams;

export type OutputListEquipmentsDto = Either<IError, PaginationData<IEquipmentEntity>>;
