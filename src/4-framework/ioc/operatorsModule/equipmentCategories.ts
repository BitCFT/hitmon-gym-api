import { CreateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/createEquipmentCategoryOperator';
import { DeleteEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/deleteEquipmentCategoryOperator';
import { ListEquipmentCategoriesOperator } from '@controller/operators/equipmentCategory/listEquipmentCategoriesOperator';
import { UpdateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/updateEquipmentCategoryOperator';
import { interfaces } from 'inversify';

export const equipmentCategoriesOperatorsModule = (bind: interfaces.Bind) => {
  bind(CreateEquipmentCategoryOperator).toSelf();
  bind(DeleteEquipmentCategoryOperator).toSelf();
  bind(ListEquipmentCategoriesOperator).toSelf();
  bind(UpdateEquipmentCategoryOperator).toSelf();
};
