import { container } from '@shared/container';
import { Router } from 'express';
import { CreateEquimentCategoryController } from '../controllers/equipmentCategory/createEquipmentCategoryController';
import { EquipmentCategoryRoutes } from './systemRoutes';

export const routes = () => {
  const router = Router();

  router.get('/welcome', (req, res) => {
    return res.json({
      message: 'Bem vindo ao servidor',
    });
  });

  router.post(EquipmentCategoryRoutes.CREATE, async (req, res) => {
    const controller = container.get(CreateEquimentCategoryController);
    const controllerHandlerResult = await controller.handle(req);

    return res.status(controllerHandlerResult.statusCode).json(controllerHandlerResult.body);
  });

  return router;
};
