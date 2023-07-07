import '@framework/ioc/inversifyConfig';
import express, { json } from 'express';
import { routes } from '@framework/server/config/routes';
import { logRoutes } from './config/logRoutes';

const SERVER_PORT = 3000;
const app = express();

app.use(json());
app.use(routes());

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
  logRoutes(routes());
});
