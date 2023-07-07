import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { LoggerService } from '@framework/services/loggerService';
import { UniqueIdentifierService } from '@framework/services/uniqueIdentifierService';
import { ContainerModule, interfaces } from 'inversify';

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).to(UniqueIdentifierService);
  bind<ILoggerService>(ILoggerServiceToken).to(LoggerService);
});
