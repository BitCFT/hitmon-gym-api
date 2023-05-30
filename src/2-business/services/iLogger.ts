export const ILoggerServiceToken = Symbol.for("ILoggerService");

export interface ILoggerService {
  log(log: any): void;
  error(log: any): void;
}
