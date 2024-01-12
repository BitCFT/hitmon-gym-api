import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IUserRepository } from '@business/repositories/user/iUserRepository';
import { IUserRepositoryToken } from '@business/repositories/user/types';
import { EquipmentCategoryRepository } from '@framework/database/repositories/equipmentCategoryRepository';
import { EquipmentRepository } from '@framework/database/repositories/equipmentRepository';
import { UserRepository } from '@framework/database/repositories/userRepository';
import { ContainerModule, interfaces } from 'inversify';

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IEquipmentCategoryRepository>(IEquipmentCategoryRepositoryToken).to(EquipmentCategoryRepository);
  bind<IEquipmentRepository>(IEquipmentRepositoryToken).to(EquipmentRepository);
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository);
});
