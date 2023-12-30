import { Router } from 'express';

const switchSpace = (method: any) => {
  switch (method.length) {
    case 3:
      return `    | `;
    case 4:
      return `   | `;
    case 5:
      return `  | `;
    case 6:
      return ` | `;
    default:
      return ' | ';
  }
};

export const logRoutes = (routes: Router) => {
  console.log('Routes:\n');

  routes.stack.forEach(layer => {
    const { path, stack } = layer.route;
    const method = stack[0].method.toUpperCase();
    let space: string = switchSpace(method);

    console.log(`${method.toUpperCase()}` + space + `${path}`);
  });

  console.log('\n');
};
