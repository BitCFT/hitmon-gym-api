import { LoginController } from '@presentation/controllers/authentication/loginController';
import { CreateEquipmentController } from '@presentation/controllers/equipment/createEquipmentController';
import { DeleteEquipmentController } from '@presentation/controllers/equipment/deleteEquipmentController';
import { ListEquipmentsController } from '@presentation/controllers/equipment/listEquipmentsController';
import { UpdateEquipmentController } from '@presentation/controllers/equipment/updateEquipmentController';
import { CreateEquimentCategoryController } from '@presentation/controllers/equipmentCategory/createEquipmentCategoryController';
import { DeleteEquimentCategoryController } from '@presentation/controllers/equipmentCategory/deleteEquipmentCategoryController';
import { ListEquipmentCategoriesController } from '@presentation/controllers/equipmentCategory/listEquipmentCategoriesController';
import { UpdateEquipmentCategoryController } from '@presentation/controllers/equipmentCategory/updateEquipmentCategoryController';
import { CheckAccountVerificationCodeController } from '@presentation/controllers/user/checkAccountVerificationCodeController';
import { CreateUserController } from '@presentation/controllers/user/createUserController';
import { ResendAccountVerificationCodeController } from '@presentation/controllers/user/resendAccountVerificationCodeController';
import { ContainerModule, interfaces } from 'inversify';

export const ControllersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateEquimentCategoryController).toSelf();
  bind(DeleteEquimentCategoryController).toSelf();
  bind(ListEquipmentCategoriesController).toSelf();
  bind(UpdateEquipmentCategoryController).toSelf();
  bind(CreateEquipmentController).toSelf();
  bind(ListEquipmentsController).toSelf();
  bind(DeleteEquipmentController).toSelf();
  bind(UpdateEquipmentController).toSelf();
  bind(CreateUserController).toSelf();
  bind(CheckAccountVerificationCodeController).toSelf();
  bind(ResendAccountVerificationCodeController).toSelf();
  bind(LoginController).toSelf();
});
