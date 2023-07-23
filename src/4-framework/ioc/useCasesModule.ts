import { CreateEquipmentUseCase } from '@business/useCases/equipment/createEquipmentUseCase';
import { DeleteEquipmentUseCase } from '@business/useCases/equipment/deleteEquipmentUseCase';
import { ListEquipmentsUseCase } from '@business/useCases/equipment/listEquipmentsUseCase';
import { CreateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/createEquipmentCategoryUseCase';
import { DeleteEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/deleteEquipmentCategoryUseCase';
import { ListEquipmentCategoriesUseCase } from '@business/useCases/equipmentCategory/listEquipmentCategoriesUseCase';
import { UpdateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/updateEquipmentCategoryUseCase';
import { CheckAccountVerificationCodeUseCase } from '@business/useCases/user/checkAccountVerificationCodeUseCase';
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { ResendAccountVerificationCodeUseCase } from '@business/useCases/user/resendAccountVerificationCodeUseCase';
import { ContainerModule, interfaces } from 'inversify';

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf();
  bind(ResendAccountVerificationCodeUseCase).toSelf();
  bind(CheckAccountVerificationCodeUseCase).toSelf();
  bind(CreateEquipmentCategoryUseCase).toSelf();
  bind(ListEquipmentCategoriesUseCase).toSelf();
  bind(UpdateEquipmentCategoryUseCase).toSelf();
  bind(DeleteEquipmentCategoryUseCase).toSelf();
  bind(CreateEquipmentUseCase).toSelf();
  bind(ListEquipmentsUseCase).toSelf();
  bind(DeleteEquipmentUseCase).toSelf();
});
