import { container } from '@shared/container';
import { UseCasesModule } from './useCasesModule';
import { OperatorsModule } from './operatorsModule';
import { ControllersModule } from './controllersModule';
import { MiddlewaresModule } from './middlewaresModule';
import { RepositoriesModule } from './repositoriesModule';
import { ServicesModule } from './servicesModule';

container.load(RepositoriesModule);
container.load(ServicesModule);
container.load(OperatorsModule);
container.load(ControllersModule);
container.load(UseCasesModule);
container.load(MiddlewaresModule);
