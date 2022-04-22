import workerURL from 'sql.js/dist/worker.sql-wasm-debug.js?url';
import dailyService from 'Service/daily';

class DBWorker {
  constructor() {
    this.worker = new Worker(workerURL);
    this._ready = false;
  }

  get #_ready() {
    return this._ready;
  }

  set #_ready(ready) {
    this._ready = ready;
  }

  // Open a database
  async open(filePath = '/data/daily.db') {
    const buffer = await fetch(filePath).then((response) => response.arrayBuffer());
    this.worker.postMessage({
      id: 1,
      action: 'open',
      buffer: buffer,
    });

    return this.getMessage();
  }

  /**
   * 执行sql语句
   * @param {*} commands
   */
  execute(commands) {
    this.worker.postMessage({
      id: 2,
      action: 'exec',
      sql: commands,
    });

    return this.getMessage();
  }

  /**
  * 获取消息
  * @returns {Promise} 
  */
  getMessage() {
    return new Promise((resolve, reject) => {
      this.worker.onmessage = (e) => {

        if (e.data.error) {
          reject(e.data.error);
        }

        if (e.data.ready) {
          resolve('db is ready');
        }

        if (e.data.results) {
          resolve(toJSON(e.data.results));
        }
      };

      this.worker.onerror = (e) => {
        reject(e);
      };
    });
  }
}

/**
 * 数据转换
 * @param {*} data
 * @returns
 */
const toJSON = (data) => {
  return data.map(({ columns, values: rows }) => {
    const obj = {};
    return rows.map((row) => {
      row.map((column, index) => {
        obj[columns[index]] = column;
      });

      return obj;
    });
  });
};

export const run = async () => {
  const db = new DBWorker();
  await db.open();
  const [res] = await db.execute('SELECT * FROM daily').catch(console.error);
  console.log('init_db_worker', res);
  // dailyService.bulkDaily(res);
};

run();
