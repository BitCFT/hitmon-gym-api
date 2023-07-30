export enum EquipmentCategoryRoutes {
  CREATE = '/equipment-categories',
  FIND_ALL = '/equipment-categories',
  DELETE = '/equipment-categories/:id',
  UPDATE = '/equipment-categories/:id',
}

export enum EquipmentRoutes {
  CREATE = '/equipments',
  FIND_ALL = '/equipments',
  DELETE = '/equipments/:id',
  UPDATE = '/equipments/:id',
}

export enum UserRoutes {
  CREATE = '/users',
  CHECK_ACCOUNT_VERIFICATION_CODE = '/users/verification-code/:code',
  RESEND_ACCOUNT_VERIFICATION_CODE = '/users/resend-verification-code'
}
