import express, { Express } from 'express';
import { configMiddleware } from './middleware';
import { configRoutes } from './routes';

export const setUpApp = (): Express => {
  const app = express();
  configMiddleware(app);
  configRoutes(app);
  return app;
};
