import { IEquipmentRepository } from '@business/repositories/equipment/iEquipmentRepository';
import { fakeEquipment, fakeEquipments } from '@test/utility/fakes/entities/equipment';

export const equipmentRepositoryMock: IEquipmentRepository = {
  create: jest.fn().mockResolvedValue(fakeEquipment),
  findByName: jest.fn().mockResolvedValue(fakeEquipment),
  listAll: jest.fn().mockResolvedValue(fakeEquipments),
  findById: jest.fn().mockResolvedValue(fakeEquipment),
  update: jest.fn().mockResolvedValue(fakeEquipment),
  delete: jest.fn().mockResolvedValue(undefined),
};
