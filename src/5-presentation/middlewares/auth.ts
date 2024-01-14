import { GetUserByTokenUseCase } from '@business/useCases/user/getUserByTokenUseCase';
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { ok, serverError, unauthorized } from '@presentation/protocols/httpStatus';
import { inject, injectable } from 'inversify';
import { AuthorizationGeneralError, AuthorizationHeaderNotProvided, TokenNotProvided } from './errors';
import { TokenExpiredError } from '@business/module/errors/services/jwtService';
import { IMiddleware } from '@presentation/protocols/middleware';

@injectable()
export class AuthMiddleware implements IMiddleware {
  constructor(
    @inject(GetUserByTokenUseCase)
    private readonly getUserByTokenUseCase: GetUserByTokenUseCase
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const authorizationHeader = httpRequest.headers?.authorization;

    if (!authorizationHeader) {
      return unauthorized(AuthorizationHeaderNotProvided);
    }

    const token = authorizationHeader.split(' ')[1];

    if (token === 'undefined') {
      return unauthorized(TokenNotProvided);
    }

    const user = await this.getUserByTokenUseCase.exec({ token });

    if (user.isLeft()) {
      if (user.value.code === TokenExpiredError.code) {
        return unauthorized(TokenExpiredError);
      }

      return serverError(AuthorizationGeneralError);
    }

    return ok({ user: user.value });
  }
}
