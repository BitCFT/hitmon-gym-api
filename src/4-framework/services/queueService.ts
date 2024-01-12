import { SendDataQueueServiceError } from '@business/module/errors/services/queueService';
import { IQueueService, InputSendQueueData, OutputSendQueueData } from '@business/services/iQueueService';
import { left, right } from '@shared/either';
import { injectable } from 'inversify';
import amqp from 'amqplib';

@injectable()
export class QueueService implements IQueueService {
  async sendData<T>(input: InputSendQueueData<T>): Promise<OutputSendQueueData> {
    let connection;
    try {
      const queue = 'hello';
      const message = {
        ...input.payload,
      };

      connection = await amqp.connect('amqp://rabbitmq');
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(" [x] Sent '%s'", message);
      await channel.close();

      return right(true);
    } catch (error: any) {
      return left(SendDataQueueServiceError(error?.message));
    } finally {
      if (connection) await connection.close();
    }
  }
}
