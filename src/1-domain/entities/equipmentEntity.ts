import { AbstractEntity } from '@domain/abstractEntity';
import { IBaseEntity } from '@domain/baseEntity';
import { Either, right } from '@shared/either';
import { IError } from '@shared/iError';

export interface IEquipmentEntity extends IBaseEntity {
  name: string;
  price: number;
  categoryId: string;
}

export class EquipmentEntity extends AbstractEntity<IEquipmentEntity> {
  static create(props: IEquipmentEntity): Either<IError, EquipmentEntity> {
    const equipment = new EquipmentEntity(props);

    return right(equipment);
  }
}
