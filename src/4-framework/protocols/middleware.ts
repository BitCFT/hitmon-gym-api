import { RoleTypes } from '@domain/entities/roleEntity';
import { HttpRequest, HttpResponse } from './http';

export interface IMiddleware {
  handle(httpRequest: HttpRequest, roles?: RoleTypes[]): Promise<HttpResponse>;
}
