import { getConnection } from '../../db/connectionDB.js';

export const Ping = async (req, res) => {
  const connection = await getConnection();
  try {
    const [res] = await connection.query('SELECT NOW() as TimeResponse;');

    res.send({ message: 'received' });
  } catch (error) {
    console.log(error);
    res.send('error');
  }
};
