import { container } from '@shared/container';
import { Router } from 'express';
import { CreateEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/createEquipmentCategoryController';
import { EquipmentCategoryRoutes } from './systemRoutes';
import { ExpressRoutesAdapter } from '../adapters/expressRoutesAdapter';

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

  return router;
};
