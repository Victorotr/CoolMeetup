import { v4 as randomId } from 'uuid';
import { getConnection } from '../../db/ConnectionDB.js';


export const OnRefreshCookies = async (req, res) => {
  const conexion = await getConnection();

  try {
    console.log('refresh')
    let userId;
    const expiration = 1000 * 60 * 60 * 24 * 28;
    if (req.cookies && req.cookies.visitId) {
      userId = req.cookies.visitId;
    } else {
      userId = randomId();
      res.cookie('visitId', userId, {
        maxAge: expiration,
        httpOnly: true,
        secure: process.env.ENVIROMENT !== "development",
      });
    } const [saveVisit]= await conexion.query(`INSERT INTO visit(user_id) VALUE(?)`,[userId]);
     console.log(saveVisit)
    res.send({ message: 'received' });
   
   
  } catch (error) {
    console.log(error);
  } finally {
    if(conexion){ conexion.release();}
   
  }
};
