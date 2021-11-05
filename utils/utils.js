import fs from "fs";
import { dirname } from "path";

// 缩写 console.log
export const log = (...args) => {
  args.unshift(`[Brower]`);
  // args.push('color: green;');
  return console.log.apply(console, args);
};

/**
 * 睡眠time毫秒
 * @param time
 */
export const sleep = (time) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, time);
  });
};

/**
 * 格式化JSON数据
 * @param {*} data
 */
export const toJSONString = (data) => {
  return JSON.stringify(data, null, 4);
};

// 创建文件夹
const makeDirSync = (name) => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(dirname(name), { recursive: true });
  }
};

/**
 * 数据存文件
 * @param data data数据
 */
export const saveLocalData = async (data) => {
  // 当前日期
  const today = new Date().toLocaleDateString().replace(/\//g, "-");
  const [year, month, day] = today.split("-");
  const dirname = `data/${year}/${month}`;
  makeDirSync(dirname);
  // 文件名
  const fileName = `${dirname}/${today}.json`;
  // 异步写入文件
  await fs.writeFileSync(fileName, toJSONString(data));
  console.log(`JSON文件成功保存到：${localPath}.json`);
};
