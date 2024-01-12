import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { PaginationData, PaginationParams } from '@domain/pagination';

export const IEquipmentCategoryRepositoryToken = Symbol.for('IEquipmentCategoryRepositoryToken');

export type InputCreateEquipmentCategory = {
  id: string;
  name: string;
  description?: string;
};
export type OutputFindByName = IEquipmentCategoryEntity | null;
export type OutputFindById = IEquipmentCategoryEntity | null;
export type InputListAllEquipmentCategories = PaginationParams;
export type OutputListAllEquipmentCategories = PaginationData<IEquipmentCategoryEntity>;
export type InputUpdateEquipmentCategory = {
  id: string;
  params: Partial<Pick<IEquipmentCategoryEntity, 'name' | 'description'>>;
};
