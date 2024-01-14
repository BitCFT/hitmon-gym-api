import { Router } from 'express';
import { authenticationRoutes } from '../routes/authentication';
import { equipmentRoutes } from '../routes/equipment';
import { equipmentCategoryRoutes } from '../routes/equipmentCategory';
import { userRoutes } from '../routes/user';
import { Express } from 'express';

export const configRoutes = (app: Express): Router => {
  const router = Router();

  authenticationRoutes(router);
  equipmentRoutes(router);
  equipmentCategoryRoutes(router);
  userRoutes(router);

  app.use(router);

  return router;
};
