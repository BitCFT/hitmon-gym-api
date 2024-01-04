import {
  SignTokenGeneralError,
  TokenExpiredError,
  VerifyTokenGeneralError,
} from '@business/module/errors/services/jwtService';
import { IJwtService, InputSign, OutputSign, OutputVerify } from '@business/services/iJwtService';
import { left, right } from '@shared/either';
import { injectable } from 'inversify';
import JWT from 'jsonwebtoken';

@injectable()
export class JwtService implements IJwtService {
  sign(payload: InputSign): OutputSign {
    try {
      const token = JWT.sign(payload, process.env.JWT_SECRET_KEY ?? 'my-secret', { expiresIn: '1h' });

      return right(token);
    } catch (error: any) {
      return left(SignTokenGeneralError(error?.message));
    }
  }

  verify(token: string): OutputVerify {
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
