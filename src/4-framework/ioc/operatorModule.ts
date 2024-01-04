import { AuthenticationOperator } from '@controller/operators/authentication/authenticationOperator';
import { CreateEquipmentOperator } from '@controller/operators/equipment/createEquipmentOperator';
import { DeleteEquipmentOperator } from '@controller/operators/equipment/deleteEquipmentOperator';
import { ListEquipmentsOperator } from '@controller/operators/equipment/listEquipmentsOperator';
import { UpdateEquipmentOperator } from '@controller/operators/equipment/updateEquipmentOperator';
import { CreateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/createEquipmentCategoryOperator';
import { DeleteEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/deleteEquipmentCategoryOperator';
import { ListEquipmentCategoriesOperator } from '@controller/operators/equipmentCategory/listEquipmentCategoriesOperator';
import { UpdateEquipmentCategoryOperator } from '@controller/operators/equipmentCategory/updateEquipmentCategoryOperator';
import { CheckAccountVerificationCodeOperator } from '@controller/operators/user/checkAccountVerificationCodeOperator';
import { CreateUserOperator } from '@controller/operators/user/createUserOperator';
import { ResendAccountVerificationCodeOperator } from '@controller/operators/user/resendAccountVerificationCodeOperator';
import { ContainerModule, interfaces } from 'inversify';

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  // equipment-categories
  bind(CreateEquipmentCategoryOperator).toSelf();
  bind(DeleteEquipmentCategoryOperator).toSelf();
  bind(ListEquipmentCategoriesOperator).toSelf();
  bind(UpdateEquipmentCategoryOperator).toSelf();

  // equipments
  bind(CreateEquipmentOperator).toSelf();
  bind(ListEquipmentsOperator).toSelf();
  bind(DeleteEquipmentOperator).toSelf();
  bind(UpdateEquipmentOperator).toSelf();

  // users
  bind(CreateUserOperator).toSelf();
  bind(CheckAccountVerificationCodeOperator).toSelf();
  bind(ResendAccountVerificationCodeOperator).toSelf();

  // authentication
  bind(AuthenticationOperator).toSelf();
});
