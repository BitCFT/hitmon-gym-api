import { Container } from "inversify";
import {
  IHashService,
  IHashServiceToken,
} from "@business/services/iHashService";
import {
  ILoggerService,
  ILoggerServiceToken,
} from "@business/services/iLogger";
import { hashServiceMock } from "@test/utility/mocks/service/hashService.mock";
import {
  IRandomCodeService,
  IRandomCodeServiceToken,
} from "@business/services/iRandomCodeService";
import { randomCodeServiceMock } from "@test/utility/mocks/service/randomCodeService.mock";
import { logServiceMock } from "@test/utility/mocks/service/loggerService.mock";
import {
  IQueueService,
  IQueueServiceToken,
} from "@business/services/iQueueService";
import { queueServiceMock } from "@test/utility/mocks/service/queueService.mock";

export const FakeServicesModule = (container: Container) => {
  container
    .bind<IHashService>(IHashServiceToken)
    .toConstantValue(hashServiceMock);
  container
    .bind<IRandomCodeService>(IRandomCodeServiceToken)
    .toConstantValue(randomCodeServiceMock);
  container
    .bind<ILoggerService>(ILoggerServiceToken)
    .toConstantValue(logServiceMock);
  container
    .bind<IQueueService>(IQueueServiceToken)
    .toConstantValue(queueServiceMock);
};
