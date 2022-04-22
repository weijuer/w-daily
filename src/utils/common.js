import path from 'path';

/**
 * 根据文件夹批量导出
 * @param {String} directory 文件路径
 */
export function importWidgets(directory) {
  // 获取directory文件夹下的所有.vue文件
  const files = require.context(directory, true, /\.vue$/);
  const modules = {};
  files.keys().forEach((key) => {
    let name = path.basename(key, '.vue');
    let module = files(key).default || files(key);
    modules[name] = module;
  });

  return modules;
}

/**
 * throttle (节流)
 * @param {*} fn
 * @param {*} time
 * @description 节流会稀释函数的执行频率
 */
export const throttle = (fn, time = 300) => {
  let flag = true;

  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};

/**
 * throttle (节流)
 * @param {*} fn
 * @param {*} wait
 */
export function throttle1(fn, wait) {
  var timer = null;
  return function () {
    var context = this,
      args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}

/**
 * debounce（防抖）
 * @param {*} fn
 * @param {*} time
 * @description 触发高频时间后n秒内函数只会执行一次
 */
export const debounce = (fn, time = 300) => {
  let timeout = null;

  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
};

/**
 * 重复字符
 * @param {*} str
 * @param {*} times
 */
export function repeat(str, times) {
  if (String.prototype.repeat) {
    return str.repeat(times);
  } else {
    return Array(times + 1).join(str);
  }
}

/**
 * 生成随机字符串
 * @returns
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 对时间格式优化
const timestampPadStart = (str) => {
  // 必须转为字符串数字padStart方法
  return String(str).padStart(2, '0');
};

// 处理时间
export const formatTimestamp = (ts) => {
  const date = new Date(Number(ts));

  const YYYY = date.getFullYear();
  const MM = timestampPadStart(date.getMonth() + 1);
  const DD = timestampPadStart(date.getDate());

  const hh = timestampPadStart(date.getHours());
  const mm = timestampPadStart(date.getMinutes());
  const ss = timestampPadStart(date.getSeconds());

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};
