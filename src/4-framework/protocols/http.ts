import { IUserEntity } from '@domain/entities/userEntity';

export type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;

export type HttpRequest = {
  params?: any;
  query?: any;
  body?: any;
  user?: Omit<IUserEntity, 'password'>;
  headers?: {
    authorization?: string;
  };
};

export type HttpResponse = {
  statusCode: StatusCode;
  body: any;
};
