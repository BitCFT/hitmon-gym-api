import { CreateEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/createEquipmentCategoryController';
import { DeleteEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/deleteEquipmentCategoryController';
import { ListEquipmentCategoriesController } from '@framework/server/controllers/equipmentCategory/listEquipmentCategoriesController';
import { ContainerModule, interfaces } from 'inversify';

export const ControllersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEquimentCategoryController).toSelf();
  bind(DeleteEquimentCategoryController).toSelf();
  bind(ListEquipmentCategoriesController).toSelf();
});
