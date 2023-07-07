import 'reflect-metadata';
import 'source-map-support/register';
import '@framework/ioc/inversifyConfig';
import express, { json } from 'express';
import { routes } from '@framework/server/config/routes';
import { logRoutes } from './config/logRoutes';

const app = express();

app.use(json());
app.use(routes());

app.listen(3000, () => {
  console.log('Server running on port 3000\n');
  logRoutes(routes());
});
