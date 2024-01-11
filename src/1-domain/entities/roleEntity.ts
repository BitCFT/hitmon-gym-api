import { AbstractEntity } from '@domain/abstractEntity';
import { IBaseEntity } from '@domain/baseEntity';
import { Either, right } from '@shared/either';
import { IError } from '@shared/iError';

export enum RoleTypes {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
}

export interface IRoleEntity extends IBaseEntity {
  type: RoleTypes;
  description: string;
}

export class RoleEntity extends AbstractEntity<IRoleEntity> {
  static create(props: IRoleEntity): Either<IError, RoleEntity> {
    const role = new RoleEntity(props);

    return right(role);
  }
}
