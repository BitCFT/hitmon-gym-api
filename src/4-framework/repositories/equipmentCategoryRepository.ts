import {
  IEquipmentCategoryRepository,
  InputCreateEquipmentCategory,
  InputUpdateEquipmentCategory,
  OutputFindById,
  OutputFindByName,
  OutputListAllEquipmentCategories,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { PaginationParams } from '@domain/pagination';
import { injectable } from 'inversify';

@injectable()
export class EquipmentCategoryRepository implements IEquipmentCategoryRepository {
  private equipmentCategories: IEquipmentCategoryEntity[] = [];

  async create(input: InputCreateEquipmentCategory): Promise<IEquipmentCategoryEntity> {
    const index = this.equipmentCategories.push(input) - 1;

    return this.equipmentCategories[index];
  }

  async findByName(name: string): Promise<OutputFindByName> {
    const equipmentCategory = this.equipmentCategories.find(element => element.name === name);
    return equipmentCategory ?? null;
  }

  listAll(input: PaginationParams): Promise<OutputListAllEquipmentCategories> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<OutputFindById> {
    throw new Error('Method not implemented.');
  }

  update(input: InputUpdateEquipmentCategory): Promise<IEquipmentCategoryEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
