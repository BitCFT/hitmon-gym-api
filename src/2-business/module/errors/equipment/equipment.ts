import { IError } from '@shared/iError';

export const CreateEquipmentGeneralError: IError = {
  code: 'EQP-001',
  message: 'Create Equipment General Error',
  shortMessage: 'createEquipmentGeneralError',
};

export const EquipmentAlreadyInUseError: IError = {
  code: 'EQP-002',
  message: 'Equipment Is Already In Use',
  shortMessage: 'nameNotAvailable',
};

export const ListEquipmentsGeneralError: IError = {
  code: 'EQP-003',
  message: 'List Equipments General Error',
  shortMessage: 'listEquipmentsGeneralError',
};

export const UpdateEquipmentGeneralError: IError = {
  code: 'EQP-004',
  message: 'Update Equipment General Error',
  shortMessage: 'updateEquipmentGeneralError',
};

export const EquipmentIsNotFoundError: IError = {
  code: 'EQP-005',
  message: 'Equipment Is Not Found Error',
  shortMessage: 'equipmentIsNotFoundError',
};

export const DeleteEquipmentGeneralError: IError = {
  code: 'EQP-006',
  message: 'Delete Equipment General Error',
  shortMessage: 'deleteEquipmentGeneralError',
};
