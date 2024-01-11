import { HttpRequest, HttpResponse } from '@framework/protocols/http';
import { forbidden, ok, unauthorized } from '@framework/protocols/httpStatus';
import { IMiddleware } from '@framework/protocols/middleware';
import { injectable } from 'inversify';
import { AuthorizationGeneralError, ForbiddenError } from './errors';
import { RoleTypes } from '@domain/entities/roleEntity';

@injectable()
export class RoleMiddlware implements IMiddleware<RoleTypes[]> {
  async handle(httpRequest: HttpRequest, roles: RoleTypes[]): Promise<HttpResponse> {
    const authenticatedUser = httpRequest.user;

    if (!authenticatedUser) {
      return unauthorized(AuthorizationGeneralError);
    }

    const userRoles = authenticatedUser.roles!.map(userRole => userRole.type);
    let hasPermission = true;

    roles.forEach(role => {
      if (!userRoles.includes(role)) {
        hasPermission = false;
      }
    });

    return hasPermission ? ok(null) : forbidden(ForbiddenError);
  }
}
