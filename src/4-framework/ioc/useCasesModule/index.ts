import { ContainerModule, interfaces } from 'inversify';
import { usersUseCasesModule } from './users';
import { equipmentCategoriesUseCasesModule } from './equipmentCategories';
import { equipmentsUseCasesModule } from './equipments';
import { authenticationUseCasesModule } from './authentication';

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  usersUseCasesModule(bind);
  equipmentCategoriesUseCasesModule(bind);
  equipmentsUseCasesModule(bind);
  authenticationUseCasesModule(bind);
});
