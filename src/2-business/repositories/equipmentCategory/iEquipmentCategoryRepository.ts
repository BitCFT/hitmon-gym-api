import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';

export const IEquipmentCategoryRepositoryToken = Symbol.for('IEquipmentCategoryRepositoryToken');

export type InputCreateEquipmentCategory = {
  name: string;
};

export type OutputFindByName = IEquipmentCategoryEntity | null;

export interface IEquipmentCategoryRepository {
  create(input: InputCreateEquipmentCategory): Promise<IEquipmentCategoryEntity>;
  findByName(name: string): Promise<OutputFindByName>;
}
