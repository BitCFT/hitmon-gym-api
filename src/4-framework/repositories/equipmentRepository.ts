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
import { prismaClient } from '@framework/prisma/prismaClient';
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

  findById(id: string): Promise<OutputFindById> {
    throw new Error('Method not implemented.');
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

  update(input: InputUpdateEquipment): Promise<IEquipmentEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
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
