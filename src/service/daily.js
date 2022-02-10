import { execute } from 'DB/db';

export const getDailies = async () => {
  const res = await execute('SELECT * FROM dailies');
  console.log(res);
  return res;
};

export const getDaily = async (id) => {
  const { daily } = await execute(`SELECT * FROM daily WHERE id = ${id}`);
  return daily;
};
