import { guid } from './common';

export function generateDaily() {
  // 引入data下及其子目录下所有的.json文件
  const modules = import.meta.globEager('../../data/**/*.json');
  console.log(modules);
  // 递归获取 views 文件夹下的所有.vue文件
  return Object.entries(modules).map(([fileName, { default: articles }]) => {
    const [, name] = fileName.match(/([0-9a-zA-Z\-]+)\.json$/);
    const id = guid();
    return {
      id,
      name,
      articles,
    };
  });
}
