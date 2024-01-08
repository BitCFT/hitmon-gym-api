import { container } from '@shared/container';
import { UseCasesModule } from './useCasesModule';
import { RepositoryModule } from './repositoryModule';
import { ServicesModule } from './serviceModule';
import { OperatorModule } from './operatorModule';
import { ControllersModule } from './controllersModule';
import { MiddlewaresModule } from './middlewaresModule';

container.load(RepositoryModule);
container.load(ServicesModule);
container.load(OperatorModule);
container.load(ControllersModule);
container.load(UseCasesModule);
container.load(MiddlewaresModule);
