import { container } from '@shared/container';
import { ExpressMiddlewareAdapter } from '../adapters/expressMiddlewareAdapter';
import { AuthMiddleware } from '@presentation/middlewares/auth';

export const Auth = ExpressMiddlewareAdapter.adapt(container.get(AuthMiddleware));
