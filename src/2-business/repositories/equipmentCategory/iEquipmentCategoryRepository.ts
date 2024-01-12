import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import {
  InputCreateEquipmentCategory,
  InputListAllEquipmentCategories,
  InputUpdateEquipmentCategory,
  OutputFindById,
  OutputFindByName,
  OutputListAllEquipmentCategories,
} from './types';

export interface IEquipmentCategoryRepository {
  create(input: InputCreateEquipmentCategory): Promise<IEquipmentCategoryEntity>;
  findByName(name: string): Promise<OutputFindByName>;
  findById(id: string): Promise<OutputFindById>;
  listAll(input: InputListAllEquipmentCategories): Promise<OutputListAllEquipmentCategories>;
  update(input: InputUpdateEquipmentCategory): Promise<IEquipmentCategoryEntity>;
  delete(id: string): Promise<void>;
}
