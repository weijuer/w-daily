/**
 * 缩写 console.log
 * @param  {...any} args
 * @returns
 */
export const log = (...args) => {
  args.unshift("%c[Brower]", "color: blue;");
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
