import { createRouter, createWebHashHistory } from 'vue-router';
import { generateRoutes } from 'Utils/routes';

const customRoutes = generateRoutes();

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
  },
  ...customRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
