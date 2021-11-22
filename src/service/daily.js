import { execute } from 'DB/db';

export const getDailies = async () => {
  const result = await execute('SELECT * FROM dailies');
  console.log(result);
  return result;
};

export const getDaily = async (id) => {
  const { daily } = await execute(`SELECT * FROM daily WHERE id = ${id}`);
  return daily;
};
