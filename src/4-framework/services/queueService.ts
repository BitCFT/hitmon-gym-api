import { sendDataQueueServiceError } from '@business/module/errors/services/queueService';
import { IQueueService, InputSendQueueData, OutputSendQueueData } from '@business/services/iQueueService';
import { left, right } from '@shared/either';
import { injectable } from 'inversify';

@injectable()
export class QueueService implements IQueueService {
  async sendData<T>(input: InputSendQueueData<T>): Promise<OutputSendQueueData> {
    try {
      return right(true);
    } catch (error: any) {
      return left(sendDataQueueServiceError(error?.message));
    }
  }
}
