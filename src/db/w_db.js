import Dexie from 'dexie';

/**
 * indexeddb  W_DB数据库
 */
class WDB extends Dexie {
  constructor(name = 'W_DB') {
    // 数据库名
    super(name);

    /**
     * 数据库表
     * Primary key and indexed props
     */
    this.version(1).stores({
      daily: '++id, title, author, summary, url, createTime, updateTime',
    });

    // 日志表
    this.daily = this.table('daily');
  }
}

export default new WDB();
