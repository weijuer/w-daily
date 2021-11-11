import service from 'Utils/service';
import { generateDaily } from 'Utils/dailyUtils';
const LATENCY = 16;

const dailies = generateDaily();

console.log('dailies', dailies);

/**
 * 获取全部文章列表
 */
export function get_all_dailies(cb) {
  setTimeout(() => {
    cb(dailies);
  }, LATENCY);
}

export function get_article() {
  return dailies;
}
