import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { Container } from 'inversify';
import { userRepositoryMock } from '@test/utility/mocks/repository/userRepository.mock';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { equipmentCategoryRepositoryMock } from '../mocks/repository/equipementCategory.mock';

export const FakeRepositoriesModule = (container: Container) => {
  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock);
  container
    .bind<IEquipmentCategoryRepository>(IEquipmentCategoryRepositoryToken)
    .toConstantValue(equipmentCategoryRepositoryMock);
};
