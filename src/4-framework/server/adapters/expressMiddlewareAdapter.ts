import { RoleTypes } from '@domain/entities/roleEntity';
import { HttpRequest } from '@presentation/protocols/http';
import { IMiddleware } from '@presentation/protocols/middleware';
import { NextFunction, Request, Response } from 'express';

export class ExpressMiddlewareAdapter {
  static adapt(middleware: IMiddleware<RoleTypes[]>, roles: RoleTypes[] = []) {
    return async function (request: Request, response: Response, next: NextFunction) {
      const httpRequest: HttpRequest = {
        ...(request.headers && {
          headers: {
            authorization: request.headers.authorization,
          },
        }),
        ...(request.user && {
          user: request.user,
        }),
      };

      const httpResponse = await middleware.handle(httpRequest, roles);

      if (httpResponse.statusCode === 200) {
        if (httpResponse.body !== null) {
          Object.assign(request, httpResponse.body);
          next();
        } else {
          next();
        }
      } else {
        return response.status(httpResponse.statusCode).json(httpResponse.body);
      }
    };
  }
}
