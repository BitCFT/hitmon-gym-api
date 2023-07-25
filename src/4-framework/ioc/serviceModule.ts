import { IHashService, IHashServiceToken } from '@business/services/iHashService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IRandomCodeService, IRandomCodeServiceToken } from '@business/services/iRandomCodeService';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { HashService } from '@framework/services/hashService';
import { LoggerService } from '@framework/services/loggerService';
import { RandomCodeService } from '@framework/services/randomCodeService';
import { UniqueIdentifierService } from '@framework/services/uniqueIdentifierService';
import { ContainerModule, interfaces } from 'inversify';

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).to(UniqueIdentifierService);
  bind<ILoggerService>(ILoggerServiceToken).to(LoggerService);
  bind<IHashService>(IHashServiceToken).to(HashService);
  bind<IRandomCodeService>(IRandomCodeServiceToken).to(RandomCodeService);
});
