import {
  IEquipmentCategoryRepository,
  InputCreateEquipmentCategory,
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
    this.equipmentCategories.push(input);

    return this.equipmentCategories[this.equipmentCategories.length];
  }

  findByName(name: string): Promise<OutputFindByName> {
    throw new Error('Method not implemented.');
  }

  listAll(input: PaginationParams): Promise<OutputListAllEquipmentCategories> {
    throw new Error('Method not implemented.');
  }
}
