import { Router } from 'express';

export const logRoutes = (routes: Router) => {
  console.log('Routes:\n');
  routes.stack.forEach(layer => {
    console.log(`path: ${layer.route.path} -- method: ${layer.route.stack[0].method}`);
  });
};
