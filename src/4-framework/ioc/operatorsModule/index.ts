import { ContainerModule, interfaces } from 'inversify';
import { usersOperatorsModule } from './users';
import { equipmentsOperatorsModule } from './equipments';
import { equipmentCategoriesOperatorsModule } from './equipmentCategories';
import { authenticationOperatorsModule } from './authentication';

export const OperatorsModule = new ContainerModule((bind: interfaces.Bind) => {
  usersOperatorsModule(bind);
  equipmentsOperatorsModule(bind);
  equipmentCategoriesOperatorsModule(bind);
  authenticationOperatorsModule(bind);
});
