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
  params: Partial<IEquipmentCategoryEntity>;
};

export interface IEquipmentCategoryRepository {
  create(input: InputCreateEquipmentCategory): Promise<IEquipmentCategoryEntity>;
  findByName(name: string): Promise<OutputFindByName>;
  findById(id: string): Promise<OutputFindById>;
  listAll(input: InputListAllEquipmentCategories): Promise<OutputListAllEquipmentCategories>;
  update(input: InputUpdateEquipmentCategory): Promise<IEquipmentCategoryEntity>;
  delete(id: string): Promise<void>;
}
