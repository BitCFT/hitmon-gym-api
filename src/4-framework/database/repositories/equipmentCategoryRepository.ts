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
import { prismaClient } from '@framework/database/prisma/prismaClient';

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
      where: { name },
    });

    return equipmentCategory ? this.mapper(equipmentCategory) : null;
  }

  async findById(id: string): Promise<OutputFindById> {
    const equipmentCategory = await prismaClient.equipmentCategory.findUnique({
      where: { id },
    });

    return equipmentCategory ? this.mapper(equipmentCategory) : null;
  }

  async delete(id: string): Promise<void> {
    await prismaClient.equipmentCategory.delete({ where: { id } });
  }

  async listAll({ page, limit }: PaginationParams): Promise<OutputListAllEquipmentCategories> {
    const data = await prismaClient.equipmentCategory.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    const mappedData = data.map(row => this.mapper(row));
    const total = await prismaClient.equipmentCategory.count();

    return {
      meta: {
        page,
        limit,
        total,
        hasNext: total > page * limit,
      },
      data: mappedData,
    };
  }

  async update(input: InputUpdateEquipmentCategory): Promise<IEquipmentCategoryEntity> {
    const updatedEquipmentCategory = await prismaClient.equipmentCategory.update({
      where: {
        id: input.id,
      },
      data: input.params,
    });

    return this.mapper(updatedEquipmentCategory);
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
