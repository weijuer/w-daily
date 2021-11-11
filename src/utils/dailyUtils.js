// 引入daily下及其子目录下所有的.json文件
const modules = import.meta.globEager('../daily/**/*.json');

export function generateDaily() {
  // 递归获取 views 文件夹下的所有.vue文件
  return Object.entries(modules).reduce((daily, [fileName, { default: articles }]) => {
    const name = fileName.match(/([0-9a-zA-Z\-]+)\.json$/)[1];
    daily.push({
      name,
      articles,
    });
    return daily;
  }, []);
}
