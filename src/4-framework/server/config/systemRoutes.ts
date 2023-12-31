export enum BASE_ROUTES {
  EQUIPMENT_CATEGORIES = `/equipment-categories`,
  EQUIPMENTS = `/equipments`,
  USERS = `/users`,
}

export enum EquipmentCategoryRoutes {
  CREATE = `${BASE_ROUTES.EQUIPMENT_CATEGORIES}`,
  FIND_ALL = `${BASE_ROUTES.EQUIPMENT_CATEGORIES}`,
  DELETE = `${BASE_ROUTES.EQUIPMENT_CATEGORIES}/:id`,
  UPDATE = `${BASE_ROUTES.EQUIPMENT_CATEGORIES}/:id`,
}

export enum EquipmentRoutes {
  CREATE = `${BASE_ROUTES.EQUIPMENTS}`,
  FIND_ALL = `${BASE_ROUTES.EQUIPMENTS}`,
  DELETE = `${BASE_ROUTES.EQUIPMENTS}/:id`,
  UPDATE = `${BASE_ROUTES.EQUIPMENTS}/:id`,
}

export enum UserRoutes {
  CREATE = `${BASE_ROUTES.USERS}`,
  CHECK_ACCOUNT_VERIFICATION_CODE = `${BASE_ROUTES.USERS}/verification-code/:code`,
  RESEND_ACCOUNT_VERIFICATION_CODE = `${BASE_ROUTES.USERS}/resend-verification-code`,
}
