// Controlador encargado de traer la lista de meetups
import { getConnection } from '../../db/ConnectionDB.js';

export const getMeetups = async (req, res) => {
  const connection = await getConnection();
  try {
    //insertar consulta

    res.send({ message: 'received' });
  } catch (error) {
    console.log(error);
    res.send('error');
  }
  finally
  {
    connection?.release();
  }
};