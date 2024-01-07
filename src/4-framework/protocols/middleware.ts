import { HttpRequest, HttpResponse } from './http';

export interface IMiddleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
