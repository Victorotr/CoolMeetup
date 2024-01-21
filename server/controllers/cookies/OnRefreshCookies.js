import { v4 as randomId } from 'uuid';
import { getConnection } from '../../db/ConnectionDB.js';


export const OnRefreshCookies = async (req, res) => {
  const conexion = await getConnection();

  try {

    let userId;
    const expiration = 1000 * 60 * 60 * 24 * 28;
    if (req.cookies && req.cookies.visitId) {
      userId = req.cookies.visitId;
    } else {
      userId = randomId();
      res.cookie('visitId', userId, {
        maxAge: expiration,
        httpOnly: true,
        sameSite: 'none',
      });
    }
    res.send({ message: 'received' });
    //const [saveVisit]= await conexion.query(`INSERT INTO visit(user_id) VALUE(?)`,[userId]);
  } catch (error) {
    console.log(error);
  } finally {
    if(conexion){ conexion.release();}
   
  }
};
