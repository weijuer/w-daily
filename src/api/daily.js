import dailyService from 'Service/daily';

/**
 * 获取全部日志列表
 */
export function getDailyList() {
  return dailyService.getDailyList();
}

/**
 * 查询单个日志详情
 * @param {*} id
 * @returns
 */
export function getDaily(id) {
  return dailyService.getDaily(id);
}
