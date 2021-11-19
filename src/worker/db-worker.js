// import Worker from 'sql.js/dist/worker.sql-wasm-debug.js?worker';
export const worker = new Worker('node_modules/sql.js/dist/worker.sql-wasm-debug.js');

worker.onerror = (e) => {
  console.error(e.data);
};

worker.onmessage = (e) => {
  console.log(e.data);
};

// Open a database
worker.postMessage({
  id: 1,
  action: 'open',
  buffer: '../../public/data/daily.db',
});

export function execute(commands) {
  worker.postMessage({
    action: 'exec',
    sql: commands,
  });
}

// execute('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
// execute('INSERT INTO test (name) VALUES ("Hello")');
// execute('INSERT INTO test (name) VALUES ("World")');
execute('SELECT * FROM test');
