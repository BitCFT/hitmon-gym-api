export interface IError<T = any> {
  code: string;
  message: string;
  shortMessage: string;
  details?: T;
}
