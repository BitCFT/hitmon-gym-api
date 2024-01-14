import '@framework/ioc/inversifyConfig';
import { logRoutes } from './config/logRoutes';
import { setUpApp } from './config/app';
import { configRoutes } from './config/routes';

const SERVER_PORT: number = Number(process.env.PORT || 3000);
const app = setUpApp();

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
  logRoutes(configRoutes(app));
});
