import { Router } from 'express';
import chalk from 'chalk';

export const logRoutes = (routes: Router) => {
  console.log(chalk.bold('Routes:\n'));

  routes.stack.forEach(layer => {
    const { path, stack } = layer.route;
    const method = stack[0].method.toUpperCase();

    console.log(chalk.green(`Path: ${path}`) + chalk.yellow(` -- Method: ${method}`));
  });

  console.log('\n');
};
