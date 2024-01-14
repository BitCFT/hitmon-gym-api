import { container } from '@shared/container';
import { ExpressMiddlewareAdapter } from '../adapters/expressMiddlewareAdapter';
import { RoleMiddlware } from '@presentation/middlewares/role';
import { RoleTypes } from '@domain/entities/roleEntity';

export const Roles = (roles: RoleTypes[]) => {
  return ExpressMiddlewareAdapter.adapt(container.get(RoleMiddlware), roles);
};
