// 引入views下及其子目录下所有的.vue文件
const modules = import.meta.glob('../views/**/*.vue');

console.log('modules', modules);

/**
 * 根据文件夹生成路由
 */
export function generateRoutes() {
  // 递归获取 views 文件夹下的所有.vue文件
  return Object.entries(modules).map(([fileName, component]) => {
    const name = fileName.match(/([a-zA-Z\-]+)\.vue$/)?.[1];
    const parent = fileName.match(/views\/(\w+)\//)?.[1];

    return {
      name,
      path: `/${name === 'NotFound' ? ':pathMatch(.*)*' : name}`,
      children: [],
      component,
    };
  });
}