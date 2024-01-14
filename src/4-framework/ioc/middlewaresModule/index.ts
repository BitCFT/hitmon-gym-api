import { ContainerModule, interfaces } from 'inversify';
import { authMiddlewaresModule } from './auth';
import { roleMiddlewaresModule } from './role';

export const MiddlewaresModule = new ContainerModule((bind: interfaces.Bind) => {
  authMiddlewaresModule(bind);
  roleMiddlewaresModule(bind);
});
