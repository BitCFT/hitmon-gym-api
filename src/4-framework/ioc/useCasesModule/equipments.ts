import { CreateEquipmentUseCase } from '@business/useCases/equipment/createEquipmentUseCase';
import { DeleteEquipmentUseCase } from '@business/useCases/equipment/deleteEquipmentUseCase';
import { ListEquipmentsUseCase } from '@business/useCases/equipment/listEquipmentsUseCase';
import { UpdateEquipmentUseCase } from '@business/useCases/equipment/updateEquipmentUseCase';
import { interfaces } from 'inversify';

export const equipmentsUseCasesModule = (bind: interfaces.Bind) => {
  bind(CreateEquipmentUseCase).toSelf();
  bind(ListEquipmentsUseCase).toSelf();
  bind(DeleteEquipmentUseCase).toSelf();
  bind(UpdateEquipmentUseCase).toSelf();
};
