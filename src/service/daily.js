import { execute } from 'DB/db';

export const getDailies = async () => {
  const {results} = await execute('SELECT * FROM dailies');
  console.log(results);
  return results;
};

export const getDaily = async (id) => {
  const { daily } = await execute(`SELECT * FROM daily WHERE id = ${id}`);
  return daily;
};
