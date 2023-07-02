import { CreateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/createEquipmentCategoryUseCase';
import { CheckAccountVerificationCodeUseCase } from '@business/useCases/user/checkAccountVerificationCodeUseCase';
import { CreateUserUseCase } from '@business/useCases/user/createUserUseCase';
import { ResendAccountVerificationCodeUseCase } from '@business/useCases/user/resendAccountVerificationCodeUseCase';
import { ContainerModule, interfaces } from 'inversify';

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf();
  bind(ResendAccountVerificationCodeUseCase).toSelf();
  bind(CheckAccountVerificationCodeUseCase).toSelf();
  bind(CreateEquipmentCategoryUseCase).toSelf();
});
