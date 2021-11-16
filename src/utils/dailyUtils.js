// 引入daily下及其子目录下所有的.json文件
const modules = import.meta.glob('../../public/data/**/*.json');

console.log(modules);

export function generateDaily() {
  // 递归获取 views 文件夹下的所有.vue文件
  return Object.entries(modules).map(([fileName, articles]) => {
    const [_, name] = fileName.match(/([0-9a-zA-Z\-]+)\.json$/);
    return {
      name,
      articles,
    };
  });
}
