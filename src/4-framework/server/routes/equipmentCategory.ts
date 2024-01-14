import { Router } from 'express';
import { EquipmentCategoryRoutes } from '../config/systemRoutes';
import { ExpressRoutesAdapter } from '../adapters/expressRoutesAdapter';
import { container } from '@shared/container';
import { CreateEquimentCategoryController } from '@presentation/controllers/equipmentCategory/createEquipmentCategoryController';
import { DeleteEquimentCategoryController } from '@presentation/controllers/equipmentCategory/deleteEquipmentCategoryController';
import { ListEquipmentCategoriesController } from '@presentation/controllers/equipmentCategory/listEquipmentCategoriesController';
import { UpdateEquipmentCategoryController } from '@presentation/controllers/equipmentCategory/updateEquipmentCategoryController';

export const equipmentCategoryRoutes = (router: Router): void => {
  router.post(
    EquipmentCategoryRoutes.CREATE,
    ExpressRoutesAdapter.adapt(container.get(CreateEquimentCategoryController))
  );
  router.delete(
    EquipmentCategoryRoutes.DELETE,
    ExpressRoutesAdapter.adapt(container.get(DeleteEquimentCategoryController))
  );
  router.get(
    EquipmentCategoryRoutes.FIND_ALL,
    ExpressRoutesAdapter.adapt(container.get(ListEquipmentCategoriesController))
  );
  router.patch(
    EquipmentCategoryRoutes.UPDATE,
    ExpressRoutesAdapter.adapt(container.get(UpdateEquipmentCategoryController))
  );
};
