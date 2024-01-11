import { AbstractEntity } from '@domain/abstractEntity';
import { IBaseEntity } from '@domain/baseEntity';
import { Either, right } from '@shared/either';
import { IError } from '@shared/iError';

export interface IEquipmentCategoryEntity extends IBaseEntity {
  name: string;
  description?: string;
}

export class EquipmentCategoryEntity extends AbstractEntity<IEquipmentCategoryEntity> {
  static create(props: IEquipmentCategoryEntity): Either<IError, EquipmentCategoryEntity> {
    const equipmentCategory = new EquipmentCategoryEntity(props);

    return right(equipmentCategory);
  }
}
