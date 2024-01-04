import {
  SignTokenGeneralError,
  TokenExpiredError,
  VerifyTokenGeneralError,
} from '@business/module/errors/services/jwtService';
import { IJwtService, InputSign, PayloadResult } from '@business/services/iJwtService';
import { Either, left, right } from '@shared/either';
import { IError } from '@shared/iError';
import { injectable } from 'inversify';
import JWT from 'jsonwebtoken';

@injectable()
export class JwtService implements IJwtService {
  sign(payload: InputSign): Either<IError, string> {
    try {
      const token = JWT.sign(payload, process.env.JWT_SECRET_KEY ?? 'my-secret', { expiresIn: '1h' });

      return right(token);
    } catch (error: any) {
      return left(SignTokenGeneralError(error?.message));
    }
  }

  verify(token: string): Either<IError, PayloadResult> {
    try {
      const tokenPayload = JWT.verify(token, process.env.JWT_SECRET_KEY ?? 'my-secret') as JWT.JwtPayload;

      return right({
        id: tokenPayload.id,
        exp: tokenPayload.exp,
        iat: tokenPayload.iat,
      });
    } catch (error: any) {
      if (error instanceof JWT.TokenExpiredError) {
        return left(TokenExpiredError);
      }
      return left(VerifyTokenGeneralError(error?.message));
    }
  }
}
