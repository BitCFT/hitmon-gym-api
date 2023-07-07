import {
  IEquipmentCategoryRepository,
  IEquipmentCategoryRepositoryToken,
} from '@business/repositories/equipmentCategory/iEquipmentCategoryRepository';
import { EquipmentCategoryRepository } from '@framework/repositories/equipmentCategoryRepository';
import { ContainerModule, interfaces } from 'inversify';

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IEquipmentCategoryRepository>(IEquipmentCategoryRepositoryToken).to(EquipmentCategoryRepository);
});
