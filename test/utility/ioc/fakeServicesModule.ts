import { Container } from 'inversify';
import { IHashService, IHashServiceToken } from '@business/services/iHashService';
import { ILoggerService, ILoggerServiceToken } from '@business/services/iLogger';
import { hashServiceMock } from '@test/utility/mocks/service/hashService.mock';
import { IRandomCodeService, IRandomCodeServiceToken } from '@business/services/iRandomCodeService';
import { randomCodeServiceMock } from '@test/utility/mocks/service/randomCodeService.mock';
import { logServiceMock } from '@test/utility/mocks/service/loggerService.mock';
import { IQueueService, IQueueServiceToken } from '@business/services/iQueueService';
import { queueServiceMock } from '@test/utility/mocks/service/queueService.mock';
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/iUniqueIdentifierService';
import { uniqueIdentifierMock } from '../mocks/service/uniqueIdentifierService.mock';
import { IDateService, IDateServiceToken } from '@business/services/iDateService';
import { dateServiceMock } from '../mocks/service/dateService.mock';

export const FakeServicesModule = (container: Container) => {
  container.bind<IHashService>(IHashServiceToken).toConstantValue(hashServiceMock);
  container.bind<IRandomCodeService>(IRandomCodeServiceToken).toConstantValue(randomCodeServiceMock);
  container.bind<ILoggerService>(ILoggerServiceToken).toConstantValue(logServiceMock);
  container.bind<IQueueService>(IQueueServiceToken).toConstantValue(queueServiceMock);
  container.bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).toConstantValue(uniqueIdentifierMock);
  container.bind<IDateService>(IDateServiceToken).toConstantValue(dateServiceMock);
};
