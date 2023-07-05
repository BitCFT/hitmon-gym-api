import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { PaginationData, PaginationParams } from '@domain/pagination';
import { Either } from '@shared/either';
import { IError } from '@shared/iError';

export type InputListEquipmentCategoriesDto = PaginationParams;

export type OutputListEquipmentCategoriesDto = Either<IError, PaginationData<IEquipmentCategoryEntity>>;
