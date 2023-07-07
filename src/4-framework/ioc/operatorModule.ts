import { CreateEquipmentCategoryOperator } from '@controller/operations/equipmentCategory/createEquipmentCategoryOperator';
import { ContainerModule, interfaces } from 'inversify';

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEquipmentCategoryOperator).toSelf();
});
