import { mkdirSync, writeFileSync } from "fs";

/**
 * 格式化JSON数据
 * @param {*} data
 */
export const toJSONString = (data) => {
  return JSON.stringify(data, null, 4);
};

/**
 * 创建多层目录
 * @param {String} targetDir 目标目录
 */
export const makeDirSync = (targetDir) => {
  mkdirSync(targetDir, { recursive: true });
};

/**
 * 异步写入文件
 * @param {*} file
 * @param {*} data
 */
export const saveFileSync = (file, data) => {
  writeFileSync(file, toJSONString(data));
};

/**
 * 数据存文件
 * @param data data数据
 */
export const saveLocalData = async (data) => {
  // 当前日期
  const today = new Date().toLocaleDateString().replace(/\//g, "-");
  const [year, month] = today.split("-");
  const dirname = `data/${year}/${month}`;
  // 创建文件夹
  makeDirSync(dirname);
  // 文件名
  const fileName = `${dirname}/${today}.json`;
  // 异步写入文件
  saveFileSync(fileName, data);
};
