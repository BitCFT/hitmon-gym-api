import { IQueueService } from "@business/services/iQueueService";
import { right } from "@shared/either";

export const queueServiceMock: IQueueService = {
  sendData: jest.fn().mockResolvedValue(right({})),
};
