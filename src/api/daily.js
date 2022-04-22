import DailyService from 'Service/DailyService';

const dailyService = new DailyService();

/**
 * 获取全部日志列表
 */
export function getDailyList() {
  return dailyService.findAll();
}

/**
 * 查询单个日志详情
 * @param {*} id
 * @returns
 */
export function getDaily(id) {
  return dailyService.findOne(id);
}
