import { container } from '@shared/container';
import { Router } from 'express';
import { CreateEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/createEquipmentCategoryController';
import { AuthenticationRoutes, EquipmentCategoryRoutes, EquipmentRoutes, UserRoutes } from './systemRoutes';
import { ExpressRoutesAdapter } from '../adapters/expressRoutesAdapter';
import { DeleteEquimentCategoryController } from '@framework/server/controllers/equipmentCategory/deleteEquipmentCategoryController';
import { ListEquipmentCategoriesController } from '../controllers/equipmentCategory/listEquipmentCategoriesController';
import { UpdateEquipmentCategoryController } from '../controllers/equipmentCategory/updateEquipmentCategoryController';
import { CreateEquipmentController } from '../controllers/equipment/createEquipmentController';
import { ListEquipmentsController } from '../controllers/equipment/listEquipmentsController';
import { DeleteEquipmentController } from '../controllers/equipment/deleteEquipmentController';
import { UpdateEquipmentController } from '../controllers/equipment/updateEquipmentController';
import { CreateUserController } from '../controllers/user/createUserController';
import { CheckAccountVerificationCodeController } from '../controllers/user/checkAccountVerificationCodeController';
import { ResendAccountVerificationCodeController } from '../controllers/user/resendAccountVerificationCodeController';
import { LoginController } from '../controllers/authentication/loginController';
import { ExpressMiddlewareAdapter } from '../adapters/expressMiddlewareAdapter';
import { AuthMiddleware } from '@framework/middlewares/auth';
import { RoleMiddlware } from '@framework/middlewares/role';
import { RoleTypes } from '@domain/entities/roleEntity';

export const routes = () => {
  const router = Router();

  router.get('/welcome', (req, res) => {
    return res.json({
      message: 'Bem vindo ao servidor',
    });
  });

  // equipment-categories routes
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

  // equipment routes
  router.post(
    EquipmentRoutes.CREATE,
    ExpressMiddlewareAdapter.adapt(container.get(AuthMiddleware)),
    ExpressMiddlewareAdapter.adapt(container.get(RoleMiddlware), [RoleTypes.ADMIN]),
    ExpressRoutesAdapter.adapt(container.get(CreateEquipmentController))
  );
  router.get(EquipmentRoutes.FIND_ALL, ExpressRoutesAdapter.adapt(container.get(ListEquipmentsController)));
  router.delete(EquipmentRoutes.DELETE, ExpressRoutesAdapter.adapt(container.get(DeleteEquipmentController)));
  router.patch(EquipmentRoutes.UPDATE, ExpressRoutesAdapter.adapt(container.get(UpdateEquipmentController)));

  // user routes
  router.post(UserRoutes.CREATE, ExpressRoutesAdapter.adapt(container.get(CreateUserController)));
  router.post(
    UserRoutes.CHECK_ACCOUNT_VERIFICATION_CODE,
    ExpressRoutesAdapter.adapt(container.get(CheckAccountVerificationCodeController))
  );
  router.patch(
    UserRoutes.RESEND_ACCOUNT_VERIFICATION_CODE,
    ExpressRoutesAdapter.adapt(container.get(ResendAccountVerificationCodeController))
  );

  // authentication routes
  router.post(AuthenticationRoutes.LOGIN, ExpressRoutesAdapter.adapt(container.get(LoginController)));

  return router;
};
