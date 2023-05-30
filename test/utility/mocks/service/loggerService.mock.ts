import { ILoggerService } from "@business/services/iLogger";
import { injectable } from "inversify";

@injectable()
export class LoggerServiceMock implements ILoggerService {
  log(log: any): void {
    console.log(log);
  }
  error(log: any): void {
    console.error(log);
  }
}
