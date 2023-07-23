import { CreateEquipmentOperator } from '@controller/operators/equipment/createEquipmentOperator';
import { DeleteEquipmentOperator } from '@controller/operators/equipment/deleteEquipmentOperator';
import { ListEquipmentsOperator } from '@controller/operators/equipment/listEquipmentsOperator';
import { CreateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/createEquipmentCategoryOperator';
import { DeleteEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/deleteEquipmentCategoryOperator';
import { ListEquipmentCategoriesOperator } from '@controller/operators/equipmentCategory/listEquipmentCategoriesOperator';
import { UpdateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/updateEquipmentCategoryOperator';
import { ContainerModule, interfaces } from 'inversify';

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEquipmentCategoryOperator).toSelf();
  bind(DeleteEquipmentCategoryOperator).toSelf();
  bind(ListEquipmentCategoriesOperator).toSelf();
  bind(UpdateEquipmentCategoryOperator).toSelf();
  bind(CreateEquipmentOperator).toSelf();
  bind(ListEquipmentsOperator).toSelf();
  bind(DeleteEquipmentOperator).toSelf();
});
