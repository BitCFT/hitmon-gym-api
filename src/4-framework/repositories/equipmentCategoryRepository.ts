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
import { prismaClient } from '@framework/prisma/prismaClient';

@injectable()
export class EquipmentCategoryRepository implements IEquipmentCategoryRepository {
  async create(input: InputCreateEquipmentCategory): Promise<IEquipmentCategoryEntity> {
    const equipmentCategory = await prismaClient.equipmentCategory.create({
      data: input,
    });

    return this.mapper(equipmentCategory);
  }

  async findByName(name: string): Promise<OutputFindByName> {
    const equipmentCategory = await prismaClient.equipmentCategory.findUnique({
      where: {
        name,
      },
    });

    return equipmentCategory ? this.mapper(equipmentCategory) : null;
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

  private mapper(input: any): IEquipmentCategoryEntity {
    return {
      id: input.id,
      name: input.name,
      ...(input.description && { description: input.description }),
      ...(input.createdAt && { createdAt: input.createdAt }),
      ...(input.updatedAt && { updatedAt: input.updatedAt }),
    };
  }
}
