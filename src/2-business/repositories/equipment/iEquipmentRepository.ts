import { IEquipmentEntity } from '@domain/entities/equipmentEntity';
import { PaginationData, PaginationParams } from '@domain/pagination';

export const IEquipmentRepositoryToken = Symbol.for('IEquipmentRepositoryToken');

export type InputCreateEquipment = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
};

export type OutputFindByName = IEquipmentEntity | null;
export type OutputFindById = IEquipmentEntity | null;
export type InputListAllEquipments = PaginationParams;
export type OutputListAllEquipments = PaginationData<IEquipmentEntity>;
export type InputUpdateEquipment = {
  id: string;
  params: Partial<Pick<IEquipmentEntity, 'name' | 'price' | 'categoryId'>>;
};

export interface IEquipmentRepository {
  create(input: InputCreateEquipment): Promise<IEquipmentEntity>;
  findByName(name: string): Promise<OutputFindByName>;
  findById(id: string): Promise<OutputFindById>;
  listAll(input: InputListAllEquipments): Promise<OutputListAllEquipments>;
  update(input: InputUpdateEquipment): Promise<IEquipmentEntity>;
  delete(id: string): Promise<void>;
}
