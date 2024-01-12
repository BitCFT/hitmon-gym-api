import { IEquipmentRepository } from '@business/repositories/equipment/iEquipmentRepository';
import { IEquipmentRepositoryToken } from '@business/repositories/equipment/types';
import { IEquipmentCategoryRepository } from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { IEquipmentCategoryRepositoryToken } from '@business/repositories/equipmentCategory/types';
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
