import { CreateEquimentCategoryController } from '@presentation/controllers/equipmentCategory/createEquipmentCategoryController';
import { DeleteEquimentCategoryController } from '@presentation/controllers/equipmentCategory/deleteEquipmentCategoryController';
import { ListEquipmentCategoriesController } from '@presentation/controllers/equipmentCategory/listEquipmentCategoriesController';
import { UpdateEquipmentCategoryController } from '@presentation/controllers/equipmentCategory/updateEquipmentCategoryController';
import { interfaces } from 'inversify';

export const equipmentsCategoriesControllersModule = (bind: interfaces.Bind) => {
  bind(CreateEquimentCategoryController).toSelf();
  bind(DeleteEquimentCategoryController).toSelf();
  bind(ListEquipmentCategoriesController).toSelf();
  bind(UpdateEquipmentCategoryController).toSelf();
};
