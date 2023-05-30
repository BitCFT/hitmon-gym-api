import {
  IQueueService,
  InputSendQueueData,
  OutputSendQueueData,
} from "@business/services/iQueueService";
import { right } from "@shared/either";
import { injectable } from "inversify";

@injectable()
export class QueueServiceMock implements IQueueService {
  async sendData<T>(
    input: InputSendQueueData<T>
  ): Promise<OutputSendQueueData> {
    return right({});
  }
}
