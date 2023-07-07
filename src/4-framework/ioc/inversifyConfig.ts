import { container } from '@shared/container';
import { UseCasesModule } from './useCasesModule';
import { RepositoryModule } from './repositoryModule';
import { ServicesModule } from './serviceModule';
import { OperatorModule } from './operatorModule';
import { ControllersModule } from './controllersModule';

container.load(RepositoryModule);
container.load(ServicesModule);
container.load(OperatorModule);
container.load(ControllersModule);
container.load(UseCasesModule);
