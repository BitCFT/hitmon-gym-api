import { CreateEquipmentOperator } from '@controller/operators/equipment/createEquipmentOperator';
import { DeleteEquipmentOperator } from '@controller/operators/equipment/deleteEquipmentOperator';
import { ListEquipmentsOperator } from '@controller/operators/equipment/listEquipmentsOperator';
import { UpdateEquipmentOperator } from '@controller/operators/equipment/updateEquipmentOperator';
import { interfaces } from 'inversify';

export const equipmentsOperatorsModule = (bind: interfaces.Bind) => {
  bind(CreateEquipmentOperator).toSelf();
  bind(ListEquipmentsOperator).toSelf();
  bind(DeleteEquipmentOperator).toSelf();
  bind(UpdateEquipmentOperator).toSelf();
};
