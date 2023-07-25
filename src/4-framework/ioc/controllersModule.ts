import { CreateEquipmentController } from '@framework/server/controllers/equipment/createEquipmentController';
import { DeleteEquipmentController } from '@framework/server/controllers/equipment/deleteEquipmentController';
import { ListEquipmentsController } from '@framework/server/controllers/equipment/listEquipmentsController';
import { UpdateEquipmentController } from '@framework/server/controllers/equipment/updateEquipmentController';
import { CreateEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/createEquipmentCategoryController';
import { DeleteEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/deleteEquipmentCategoryController';
import { ListEquipmentCategoriesController } from '@framework/server/controllers/equipmentCategory/listEquipmentCategoriesController';
import { UpdateEquipmentCategoryController } from '@framework/server/controllers/equipmentCategory/updateEquipmentCategoryController';
import { CreateUserController } from '@framework/server/controllers/user/createUserController';
import { ContainerModule, interfaces } from 'inversify';

export const ControllersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEquimentCategoryController).toSelf();
  bind(DeleteEquimentCategoryController).toSelf();
  bind(ListEquipmentCategoriesController).toSelf();
  bind(UpdateEquipmentCategoryController).toSelf();
  bind(CreateEquipmentController).toSelf();
  bind(ListEquipmentsController).toSelf();
  bind(DeleteEquipmentController).toSelf();
  bind(UpdateEquipmentController).toSelf();
  bind(CreateUserController).toSelf();
});
