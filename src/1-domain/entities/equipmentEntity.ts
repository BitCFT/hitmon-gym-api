import { IBaseEntity } from '@domain/baseEntity';

export interface IEquipmentEntity extends IBaseEntity {
  name: string;
  price: number;
  categoryId: string;
}
