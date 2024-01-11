import { RoleTypes } from '@domain/entities/roleEntity';
import { HttpRequest, HttpResponse } from './http';

export interface IMiddleware<T = undefined> {
  handle(httpRequest: HttpRequest, ...options: T extends undefined ? [undefined] : [T]): Promise<HttpResponse>;
}
