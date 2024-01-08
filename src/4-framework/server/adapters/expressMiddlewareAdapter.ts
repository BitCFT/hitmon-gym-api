import { HttpRequest } from '@framework/protocols/http';
import { IMiddleware } from '@framework/protocols/middleware';
import { NextFunction, Request, Response } from 'express';

export class ExpressMiddlewareAdapter {
  static adapt(middleware: IMiddleware) {
    return async function (request: Request, response: Response, next: NextFunction) {
      const httpRequest: HttpRequest = {
        ...(request.headers && {
          headers: {
            authorization: request.headers.authorization,
          },
        }),
      };

      const httpResponse = await middleware.handle(httpRequest);

      if (httpResponse.statusCode === 200) {
        Object.assign(request, httpResponse.body);
        next();
      } else {
        return response.status(httpResponse.statusCode).json(httpResponse.body);
      }
    };
  }
}
