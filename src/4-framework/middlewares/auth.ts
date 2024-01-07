import { HttpResponse } from '@framework/protocols/http';
import { IMiddleware } from '@framework/protocols/middleware';
import { injectable } from 'inversify';

@injectable()
export class AuthMiddleware implements IMiddleware {
  constructor() {}

  async handle(httpRequest: {}): Promise<HttpResponse> {
    throw new Error('Method not implemented.');
  }
}
