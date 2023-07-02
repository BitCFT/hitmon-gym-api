import { IError } from '@shared/iError';

export const createEquipmentCategoryGeneralError: IError = {
  code: '001',
  message: 'Create Equipment Category General Error',
  shortMessage: 'createEquipmentCategoryGeneralError',
};

export const equipmentCategoryAlreadyInUseError: IError = {
  code: '002',
  message: 'Equipment Category Is Already In Use',
  shortMessage: 'equipmentCategoryisAlreadyInUse',
};
