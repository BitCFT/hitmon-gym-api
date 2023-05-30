import { Either } from "@shared/either";
import { IError } from "@shared/iError";

export const IQueueServiceToken = Symbol.for("IQueueServiceToken");

export type InputSendQueueData<T> = {
  url: string;
  payload: T;
};

export type OutputSendQueueData = Either<IError, any>;

export interface IQueueService {
  sendData<T>(input: InputSendQueueData<T>): Promise<OutputSendQueueData>;
}
