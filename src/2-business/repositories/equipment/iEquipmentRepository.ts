import { IEquipmentEntity } from '@domain/entities/equipmentEntity';
import {
  InputCreateEquipment,
  InputListAllEquipments,
  InputUpdateEquipment,
  OutputFindById,
  OutputFindByName,
  OutputListAllEquipments,
} from './types';

export interface IEquipmentRepository {
  create(input: InputCreateEquipment): Promise<IEquipmentEntity>;
  findByName(name: string): Promise<OutputFindByName>;
  findById(id: string): Promise<OutputFindById>;
  listAll(input: InputListAllEquipments): Promise<OutputListAllEquipments>;
  update(input: InputUpdateEquipment): Promise<IEquipmentEntity>;
  delete(id: string): Promise<void>;
}
