import { IEquipmentCategoryRepository } from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { fakeEquipmentCategories, fakeEquipmentCategory } from '@test/utility/fakes/entities/equipmentCategory';

export const equipmentCategoryRepositoryMock: IEquipmentCategoryRepository = {
  create: jest.fn().mockResolvedValue(fakeEquipmentCategory),
  findByName: jest.fn().mockResolvedValue(fakeEquipmentCategory),
  listAll: jest.fn().mockResolvedValue(fakeEquipmentCategories),
};
