import { IError } from '@shared/iError';

export const createEquipmentGeneralError: IError = {
  code: '001',
  message: 'Create Equipment General Error',
  shortMessage: 'createEquipmentGeneralError',
};

export const equipmentAlreadyInUseError: IError = {
  code: '002',
  message: 'Equipment Is Already In Use',
  shortMessage: 'nameNotAvailable',
};

export const listEquipmentsGeneralError: IError = {
  code: '003',
  message: 'List Equipments General Error',
  shortMessage: 'listEquipmentsGeneralError',
};

export const updateEquipmentGeneralError: IError = {
  code: '004',
  message: 'Update Equipment General Error',
  shortMessage: 'updateEquipmentGeneralError',
};

export const equipmentIsNotFoundError: IError = {
  code: '005',
  message: 'Equipment Is Not Found Error',
  shortMessage: 'equipmentIsNotFoundError',
};

export const deleteEquipmentGeneralError: IError = {
  code: '006',
  message: 'Delete Equipment General Error',
  shortMessage: 'deleteEquipmentGeneralError',
};
