import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/user/iUserRepository';
import { EquipmentCategoryRepository } from '@framework/repositories/equipmentCategoryRepository';
import { EquipmentRepository } from '@framework/repositories/equipmentRepository';
import { UserRepository } from '@framework/repositories/userRepository';
import { ContainerModule, interfaces } from 'inversify';

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IEquipmentCategoryRepository>(IEquipmentCategoryRepositoryToken).to(EquipmentCategoryRepository);
  bind<IEquipmentRepository>(IEquipmentRepositoryToken).to(EquipmentRepository);
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository);
});
