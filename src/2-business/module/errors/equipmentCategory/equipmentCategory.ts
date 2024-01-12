import { IError } from '@shared/iError';

export const CreateEquipmentCategoryGeneralError: IError = {
  code: 'EQPC-001',
  message: 'Create Equipment Category General Error',
  shortMessage: 'createEquipmentCategoryGeneralError',
};

export const EquipmentCategoryAlreadyInUseError: IError = {
  code: 'EQPC-002',
  message: 'Equipment Category Is Already In Use',
  shortMessage: 'nameNotAvailable',
};

export const ListEquipmentCategoriesGeneralError: IError = {
  code: 'EQPC-003',
  message: 'List Equipment Categories General Error',
  shortMessage: 'listEquipmentCategoriesGeneralError',
};

export const UpdateEquipmentCategoryGeneralError: IError = {
  code: 'EQPC-004',
  message: 'Update Equipment Category Genereal Error',
  shortMessage: 'updateEquipmentCategoryGeneralError',
};

export const EquipmentCategoryIsNotFoundError: IError = {
  code: 'EQPC-005',
  message: 'EquipmentCategory Is Not Found Error',
  shortMessage: 'equipmentCategoryIsNotFoundError',
};

export const DeleteEquipmentCategoryGeneralError = (message?: string): IError => ({
  code: 'EQPC-006',
  message: message ?? 'Delete Equipment Category Genereal Error',
  shortMessage: 'deleteEquipmentCategoryGeneralError',
});
