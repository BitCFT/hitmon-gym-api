import { IError } from '@shared/iError';

export const createEquipmentCategoryGeneralError: IError = {
  code: '001',
  message: 'Create Equipment Category General Error',
  shortMessage: 'createEquipmentCategoryGeneralError',
};

export const equipmentCategoryAlreadyInUseError: IError = {
  code: '002',
  message: 'Equipment Category Is Already In Use',
  shortMessage: 'nameNotAvailable',
};

export const listEquipmentCategoriesGeneralError: IError = {
  code: '003',
  message: 'List Equipment Categories General Error',
  shortMessage: 'listEquipmentCategoriesGeneralError',
};

export const updateEquipmentCategoryGeneralError: IError = {
  code: '004',
  message: 'Update Equipment Category Genereal Error',
  shortMessage: 'updateEquipmentCategoryGeneralError',
};

export const equipmentCategoryIsNotFoundError: IError = {
  code: '005',
  message: 'EquipmentCategory Is Not Found Error',
  shortMessage: 'equipmentCategoryIsNotFoundError',
};

export const deleteEquipmentCategoryGeneralError = (message?: string): IError => ({
  code: '006',
  message: message || 'Delete Equipment Category Genereal Error',
  shortMessage: 'deleteEquipmentCategoryGeneralError',
});
