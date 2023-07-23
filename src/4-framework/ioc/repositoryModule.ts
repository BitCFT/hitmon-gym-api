import { IEquipmentRepository, IEquipmentRepositoryToken } from '@business/repositories/equipment/iEquipmentRepository';
import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { EquipmentCategoryRepository } from '@framework/repositories/equipmentCategoryRepository';
import { EquipmentRepository } from '@framework/repositories/equipmentRepository';
import { ContainerModule, interfaces } from 'inversify';

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IEquipmentCategoryRepository>(IEquipmentCategoryRepositoryToken).to(EquipmentCategoryRepository);
  bind<IEquipmentRepository>(IEquipmentRepositoryToken).to(EquipmentRepository);
});
