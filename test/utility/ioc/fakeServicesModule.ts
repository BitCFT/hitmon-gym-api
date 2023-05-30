import {
  IHashService,
  IHashServiceToken,
} from "@business/services/iHashService";
import {
  ILoggerService,
  ILoggerServiceToken,
} from "@business/services/iLogger";
import { ContainerModule, interfaces } from "inversify";
import { HashServiceMock } from "../mocks/service/hashService.mock";
import {
  IRandomCodeService,
  IRandomCodeServiceToken,
} from "@business/services/iRandomCodeService";
import { RandomCodeServiceMock } from "../mocks/service/randomCodeService.mock";
import { LoggerServiceMock } from "../mocks/service/loggerService.mock";
import {
  IQueueService,
  IQueueServiceToken,
} from "@business/services/iQueueService";
import { QueueServiceMock } from "../mocks/service/queueService.mock";

export const FakeServicesModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IHashService>(IHashServiceToken).to(HashServiceMock);
    bind<IRandomCodeService>(IRandomCodeServiceToken).to(RandomCodeServiceMock);
    bind<ILoggerService>(ILoggerServiceToken).to(LoggerServiceMock);
    bind<IQueueService>(IQueueServiceToken).to(QueueServiceMock);
  }
);
