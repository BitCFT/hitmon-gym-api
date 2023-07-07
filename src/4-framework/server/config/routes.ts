import { container } from '@shared/container';
import { Router } from 'express';
import { CreateEquimentCategoryController } from '../controllers/equipmentCategory/createEquipmentCategoryController';

export const routes = () => {
  const router = Router();

  router.get('/welcome', (req, res) => {
    return res.json({
      message: 'Bem vindo ao servidor',
    });
  });

  router.post('/equipment-category', (req, res) => {
    const controller = container.get(CreateEquimentCategoryController);

    return res.json(controller.handle(req));
  });

  return router;
};
