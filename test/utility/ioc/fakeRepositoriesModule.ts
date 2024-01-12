import { IUserRepository } from '@business/repositories/user/iUserRepository';
import { Container } from 'inversify';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import { IEquipmentCategoryRepository } from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { equipmentCategoryRepositoryMock } from '../mocks/repository/equipmentCategory.mock';
import { IEquipmentRepository } from '@business/repositories/equipment/iEquipmentRepository';
import { equipmentRepositoryMock } from '../mocks/repository/equipment.mock';
import { IUserRepositoryToken } from '@business/repositories/user/types';
import { IEquipmentCategoryRepositoryToken } from '@business/repositories/equipmentCategory/types';
import { IEquipmentRepositoryToken } from '@business/repositories/equipment/types';

export const FakeRepositoriesModule = (container: Container) => {
  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock);
  container
    .bind<IEquipmentCategoryRepository>(IEquipmentCategoryRepositoryToken)
    .toConstantValue(equipmentCategoryRepositoryMock);
  container.bind<IEquipmentRepository>(IEquipmentRepositoryToken).toConstantValue(equipmentRepositoryMock);
};
