import { IUserEntity } from '@domain/entities/userEntity';

declare global {
  namespace Express {
    interface Request {
      user: Omit<IUserEntity, 'password'>;
    }
  }
}
