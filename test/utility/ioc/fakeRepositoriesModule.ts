import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { Container } from 'inversify';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { equipmentCategoryRepositoryMock } from '../mocks/repository/equipmentCategory.mock';
import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import { equipmentRepositoryMock } from '../mocks/repository/equipment.mock';

export const FakeRepositoriesModule = (container: Container) => {
  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock);
  container
    .bind<IEquipmentCategoryRepository>(IEquipmentCategoryRepositoryToken)
    .toConstantValue(equipmentCategoryRepositoryMock);
  container.bind<IEquipmentRepository>(IEquipmentRepositoryToken).toConstantValue(equipmentRepositoryMock);
};
