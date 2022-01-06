// import Worker from 'sql.js/dist/worker.sql-wasm-debug.js?worker';
export const worker = new Worker('node_modules/sql.js/dist/worker.sql-wasm-debug.js');

const fetchDB = () => fetch('/data/daily.db').then((response) => response.arrayBuffer());

// Open a database
export const open = async () => {
  const buffer = await fetchDB();
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
        resolve(toJSON(e.data));
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
  return data.map(([columns, values]) => {
    const obj = {};
    columns.forEach((column, index) => {
      obj[column] = values[index];
    });
    return obj;
  })
}

await open();
