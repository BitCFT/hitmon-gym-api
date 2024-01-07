import { AuthenticationUseCase } from '@business/useCases/authentication/authenticationUseCase';
import { CreateEquipmentUseCase } from '@business/useCases/equipment/createEquipmentUseCase';
import { DeleteEquipmentUseCase } from '@business/useCases/equipment/deleteEquipmentUseCase';
import { ListEquipmentsUseCase } from '@business/useCases/equipment/listEquipmentsUseCase';
import { UpdateEquipmentUseCase } from '@business/useCases/equipment/updateEquipmentUseCase';
import { CreateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/createEquipmentCategoryUseCase';
import { DeleteEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/deleteEquipmentCategoryUseCase';
import { ListEquipmentCategoriesUseCase } from '@business/useCases/equipmentCategory/listEquipmentCategoriesUseCase';
import { UpdateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/updateEquipmentCategoryUseCase';
import { CheckAccountVerificationCodeUseCase } from '@business/useCases/user/checkAccountVerificationCodeUseCase';
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { GetUserByTokenUseCase } from '@business/useCases/user/getUserByTokenUseCase';
import { ResendAccountVerificationCodeUseCase } from '@business/useCases/user/resendAccountVerificationCodeUseCase';
import { ContainerModule, interfaces } from 'inversify';

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  // users
  bind(CreateUserUseCase).toSelf();
  bind(ResendAccountVerificationCodeUseCase).toSelf();
  bind(CheckAccountVerificationCodeUseCase).toSelf();
  bind(GetUserByTokenUseCase).toSelf();

  // equipment-categories
  bind(CreateEquipmentCategoryUseCase).toSelf();
  bind(ListEquipmentCategoriesUseCase).toSelf();
  bind(UpdateEquipmentCategoryUseCase).toSelf();
  bind(DeleteEquipmentCategoryUseCase).toSelf();

  // equipments
  bind(CreateEquipmentUseCase).toSelf();
  bind(ListEquipmentsUseCase).toSelf();
  bind(DeleteEquipmentUseCase).toSelf();
  bind(UpdateEquipmentUseCase).toSelf();

  // authentication
  bind(AuthenticationUseCase).toSelf();
});
