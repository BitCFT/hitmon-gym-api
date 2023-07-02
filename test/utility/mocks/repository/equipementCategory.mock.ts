import { IEquipmentCategoryRepository } from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { fakeEquipmentCategory } from '@test/utility/fakes/entities/equipmentCategory';

export const equipmentCategoryRepositoryMock: IEquipmentCategoryRepository = {
  create: jest.fn().mockResolvedValue(fakeEquipmentCategory),
  findByName: jest.fn().mockResolvedValue(fakeEquipmentCategory),
};
