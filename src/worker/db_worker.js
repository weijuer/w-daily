import workerURL from 'sql.js/dist/worker.sql-wasm-debug.js?url';
import dailyService from 'Service/daily';

const worker = new Worker(workerURL);

// Open a database
export const open = async () => {
  const buffer = await fetch('/data/daily.db').then((response) => response.arrayBuffer());
  worker.postMessage({
    id: 1,
    action: 'open',
    buffer: buffer,
  });

  return new Promise((resolve, reject) => {
    worker.onmessage = (e) => {
      if (e.data.id === 1) {
        resolve(e.data);
      }
    };

    worker.onerror = (e) => {
      reject(e);
    };
  });
};

/**
 * 执行sql语句
 * @param {*} commands
 */
export function execute(commands) {
  worker.postMessage({
    id: 2,
    action: 'exec',
    sql: commands,
  });

  return new Promise((resolve, reject) => {
    worker.onmessage = (e) => {
      if (e.data.id === 2) {
        resolve(toJSON(e.data.results));
      }
    };

    worker.onerror = (e) => {
      reject(e);
    };
  });
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

export const init = async () => {
  await open();
  const [res] = await execute('SELECT * FROM daily');
  console.log('init_db_worker', res);
  dailyService.bulkDaily(res);
};

init();
