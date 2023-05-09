import { IRoleEntity, RoleTypes } from "@domain/entities/roleEntity";

export const fakeRoleEntity: IRoleEntity = {
  id: "string",
  description: "string",
  type: RoleTypes.ADMIN,
};
