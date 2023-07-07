import { CreateEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/createEquipmentCategoryController';
import { ContainerModule, interfaces } from 'inversify';

export const ControllersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEquimentCategoryController).toSelf();
});
