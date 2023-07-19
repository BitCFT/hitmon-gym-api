import { container } from '@shared/container';
import { Router } from 'express';
import { CreateEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/createEquipmentCategoryController';
import { EquipmentCategoryRoutes } from './systemRoutes';
import { ExpressRoutesAdapter } from '../adapters/expressRoutesAdapter';
import { DeleteEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/deleteEquipmentCategoryController';
import { ListEquipmentCategoriesController } from '../controllers/equipmentCategory/listEquipmentCategoriesController';

export const routes = () => {
  const router = Router();

  router.get('/welcome', (req, res) => {
    return res.json({
      message: 'Bem vindo ao servidor',
    });
  });

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

  return router;
};
