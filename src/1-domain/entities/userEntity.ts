import { AbstractEntity } from '@domain/abstractEntity';
import { IRoleEntity } from './roleEntity';
import { Either, right } from '@shared/either';
import { IError } from '@shared/iError';
import { IBaseEntity } from '@domain/baseEntity';

export enum RegistrationStep {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
}

export interface IUserEntity extends IBaseEntity {
  email: string;
  password: string;
  userName: string;
  roles?: IRoleEntity[];
  registrationStep: RegistrationStep;
  accountVerificationCode?: string | null;
  accountVerificationCodeExpiresAt?: Date | null;
  passwordResetCode?: string;
  passwordResetCodeExpiresAt?: Date;
}

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: IUserEntity): Either<IError, UserEntity> {
    const user = new UserEntity(props);

    return right(user);
  }
}
