import { CreateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/createEquipmentCategoryUseCase';
import { DeleteEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/deleteEquipmentCategoryUseCase';
import { ListEquipmentCategoriesUseCase } from '@business/useCases/equipmentCategory/listEquipmentCategoriesUseCase';
import { UpdateEquipmentCategoryUseCase } from '@business/useCases/equipmentCategory/updateEquipmentCategoryUseCase';
import { interfaces } from 'inversify';

export const equipmentCategoriesUseCasesModule = (bind: interfaces.Bind) => {
  bind(CreateEquipmentCategoryUseCase).toSelf();
  bind(ListEquipmentCategoriesUseCase).toSelf();
  bind(UpdateEquipmentCategoryUseCase).toSelf();
  bind(DeleteEquipmentCategoryUseCase).toSelf();
};
