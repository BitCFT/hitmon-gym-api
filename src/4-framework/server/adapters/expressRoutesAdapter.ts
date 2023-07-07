import { HttpRequest, HttpResponse, IController } from '@business/services/iController';
import { Request, Response } from 'express';

export class ExpressRoutesAdapter {
  static adapt(controller: IController) {
    return async function (request: Request, response: Response) {
      const httpRequest: HttpRequest = {
        body: request.body,
        params: request.params,
        query: request.query,
      };

      const httpResponse: HttpResponse = await controller.handle(httpRequest);
      const { statusCode } = httpResponse;

      return response.status(statusCode).json(httpResponse.body);
    };
  }
}
