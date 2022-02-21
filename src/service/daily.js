import WDB from 'DB/w_db';

/**
 * 日志服务
 */
class DailyService {
  constructor() {
    //会话表对象实例
    this.table = WDB.daily;
  }

  /**
   * 根据id获取单条日志
   * @param {*} id
   */
  getDaily(id) {
    return this.table.get(id);
  }

  /**
   * 获取日志列表
   */
  getDailyList() {
    return this.table.orderBy('createTime').toArray();
  }

  /**
   * 批量插入日志
   * @param {*} dailyList
   * @returns
   */
  bulkDaily(dailyList) {
    console.log('bulkDaily', dailyList);
    return this.table.bulkPut(dailyList);
  }
}

const dailyService = new DailyService();

export default dailyService;
