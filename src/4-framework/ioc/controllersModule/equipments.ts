import { CreateEquipmentController } from '@presentation/controllers/equipment/createEquipmentController';
import { DeleteEquipmentController } from '@presentation/controllers/equipment/deleteEquipmentController';
import { ListEquipmentsController } from '@presentation/controllers/equipment/listEquipmentsController';
import { UpdateEquipmentController } from '@presentation/controllers/equipment/updateEquipmentController';
import { interfaces } from 'inversify';

export const equipmentsControllersModule = (bind: interfaces.Bind) => {
  bind(CreateEquipmentController).toSelf();
  bind(ListEquipmentsController).toSelf();
  bind(DeleteEquipmentController).toSelf();
  bind(UpdateEquipmentController).toSelf();
};
