import { injectable } from 'inversify';
import { AuthorizationGeneralError, ForbiddenError } from './errors';
import { RoleTypes } from '@domain/entities/roleEntity';
import { IMiddleware } from '@presentation/protocols/middleware';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { forbidden, ok, unauthorized } from '@presentation/protocols/httpStatus';

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
