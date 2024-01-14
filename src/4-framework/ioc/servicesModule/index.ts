import { IDateService, IDateServiceToken } from '@business/services/iDateService';
import { IHashService, IHashServiceToken } from '@business/services/iHashService';
import { IJwtService, IJwtServiceToken } from '@business/services/iJwtService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { IQueueService, IQueueServiceToken } from '@business/services/iQueueService';
import { IRandomCodeService, IRandomCodeServiceToken } from '@business/services/iRandomCodeService';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { DateService } from '@framework/services/dateService';
import { HashService } from '@framework/services/hashService';
import { JwtService } from '@framework/services/jwtService';
import { LoggerService } from '@framework/services/loggerService';
import { QueueService } from '@framework/services/queueService';
import { RandomCodeService } from '@framework/services/randomCodeService';
import { UniqueIdentifierService } from '@framework/services/uniqueIdentifierService';
import { ContainerModule, interfaces } from 'inversify';

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).to(UniqueIdentifierService);
  bind<ILoggerService>(ILoggerServiceToken).to(LoggerService);
  bind<IHashService>(IHashServiceToken).to(HashService);
  bind<IRandomCodeService>(IRandomCodeServiceToken).to(RandomCodeService);
  bind<IDateService>(IDateServiceToken).to(DateService);
  bind<IQueueService>(IQueueServiceToken).to(QueueService);
  bind<IJwtService>(IJwtServiceToken).to(JwtService);
});
