import {
  IEquipmentRepository,
  InputCreateEquipment,
  InputUpdateEquipment,
  OutputFindById,
  OutputFindByName,
  OutputListAllEquipments,
} from '@business/repositories/equipment/iEquipmentRepository';
import { IEquipmentEntity } from '@domain/entities/equipmentEntity';
import { PaginationParams } from '@domain/pagination';
import { prismaClient } from '@framework/database/prisma/prismaClient';
import { injectable } from 'inversify';

@injectable()
export class EquipmentRepository implements IEquipmentRepository {
  async create(input: InputCreateEquipment): Promise<IEquipmentEntity> {
    const equipment = await prismaClient.equipment.create({
      data: {
        id: input.id,
        name: input.name,
        price: input.price,
        equipmentCategoryId: input.categoryId,
      },
    });

    return this.mapper(equipment);
  }

  async findByName(name: string): Promise<OutputFindByName> {
    const equipment = await prismaClient.equipment.findUnique({ where: { name } });

    return equipment ? this.mapper(equipment) : null;
  }

  async findById(id: string): Promise<OutputFindById> {
    const equipment = await prismaClient.equipment.findUnique({
      where: { id },
    });

    return equipment ? this.mapper(equipment) : null;
  }

  async listAll({ page, limit }: PaginationParams): Promise<OutputListAllEquipments> {
    const data = await prismaClient.equipment.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    const mappedData = data.map(row => this.mapper(row));
    const total = await prismaClient.equipment.count();

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

  async update(input: InputUpdateEquipment): Promise<IEquipmentEntity> {
    const updatedEquipment = await prismaClient.equipment.update({
      where: {
        id: input.id,
      },
      data: {
        ...(input.params.name && { name: input.params.name }),
        ...(input.params.price && { price: input.params.price }),
        ...(input.params.categoryId && { equipmentCategoryId: input.params.categoryId }),
      },
    });

    return this.mapper(updatedEquipment);
  }

  async delete(id: string): Promise<void> {
    await prismaClient.equipment.delete({ where: { id } });
  }

  private mapper(data: any): IEquipmentEntity {
    return {
      id: data?.id,
      name: data?.name,
      price: data?.price,
      categoryId: data?.equipmentCategoryId,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    };
  }
}
