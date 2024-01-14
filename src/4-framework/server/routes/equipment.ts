import { Router } from 'express';
import { EquipmentRoutes } from '../config/systemRoutes';
import { Auth } from '../middlewares/auth';
import { Roles } from '../middlewares/roles';
import { RoleTypes } from '@domain/entities/roleEntity';
import { ExpressRoutesAdapter } from '../adapters/expressRoutesAdapter';
import { container } from '@shared/container';
import { CreateEquipmentController } from '@presentation/controllers/equipment/createEquipmentController';
import { ListEquipmentsController } from '@presentation/controllers/equipment/listEquipmentsController';
import { DeleteEquipmentController } from '@presentation/controllers/equipment/deleteEquipmentController';
import { UpdateEquipmentController } from '@presentation/controllers/equipment/updateEquipmentController';

export const equipmentRoutes = (router: Router): void => {
  router.post(
    EquipmentRoutes.CREATE,
    Auth,
    Roles([RoleTypes.STUDENT]),
    ExpressRoutesAdapter.adapt(container.get(CreateEquipmentController))
  );
  router.get(EquipmentRoutes.FIND_ALL, ExpressRoutesAdapter.adapt(container.get(ListEquipmentsController)));
  router.delete(EquipmentRoutes.DELETE, ExpressRoutesAdapter.adapt(container.get(DeleteEquipmentController)));
  router.patch(EquipmentRoutes.UPDATE, ExpressRoutesAdapter.adapt(container.get(UpdateEquipmentController)));
};
