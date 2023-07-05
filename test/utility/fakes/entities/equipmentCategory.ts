import { IEquipmentCategoryEntity } from '@domain/entities/equipmentCategoryEntity';
import { PaginationData } from '@domain/pagination';

export const fakeEquipmentCategory: IEquipmentCategoryEntity = {
  id: 'string',
  name: 'arms',
};

export const fakeEquipmentCategories: PaginationData<IEquipmentCategoryEntity> = {
  meta: {
    hasNext: true,
    limit: 1,
    page: 1,
    total: 2,
  },
  data: [
    {
      id: 'string',
      name: 'arms',
    },
    {
      id: 'string',
      name: 'legs',
    },
  ],
};
