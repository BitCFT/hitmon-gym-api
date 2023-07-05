import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { PaginationData, PaginationParams } from '@domain/pagination';

export const IEquipmentCategoryRepositoryToken = Symbol.for('IEquipmentCategoryRepositoryToken');

export type InputCreateEquipmentCategory = {
  name: string;
  description?: string;
};

export type OutputFindByName = IEquipmentCategoryEntity | null;

export type InputListAllEquipmentCategories = PaginationParams;

export type OutputListAllEquipmentCategories = PaginationData<IEquipmentCategoryEntity>;

export interface IEquipmentCategoryRepository {
  create(input: InputCreateEquipmentCategory): Promise<IEquipmentCategoryEntity>;
  findByName(name: string): Promise<OutputFindByName>;
  listAll(input: InputListAllEquipmentCategories): Promise<OutputListAllEquipmentCategories>;
}
