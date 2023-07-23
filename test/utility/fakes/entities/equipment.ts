import { IEquipmentEntity } from '@domain/entities/equipmentEntity';
import { PaginationData } from '@domain/pagination';

export const fakeEquipment: IEquipmentEntity = {
  id: 'string',
  categoryId: 'string',
  name: 'string',
  price: 100,
};

export const fakeEquipments: PaginationData<IEquipmentEntity> = {
  meta: {
    hasNext: true,
    limit: 1,
    page: 1,
    total: 2,
  },
  data: [
    {
      id: 'string',
      name: 'legPress',
      categoryId: 'string',
      price: 100,
    },
    {
      id: 'string',
      name: 'scott',
      categoryId: 'string',
      price: 200,
    },
  ],
};
