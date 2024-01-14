import { ContainerModule, interfaces } from 'inversify';
import { authenticationControllersModule } from './authentication';
import { equipmentsCategoriesControllersModule } from './equipmentCategories';
import { equipmentsControllersModule } from './equipments';
import { usersControllersModule } from './users';

export const ControllersModule = new ContainerModule((bind: interfaces.Bind) => {
  authenticationControllersModule(bind);
  equipmentsCategoriesControllersModule(bind);
  equipmentsControllersModule(bind);
  usersControllersModule(bind);
});
