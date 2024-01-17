import { getConnection } from '../../db/ConnectionDB.js';

const loginRegisterWithGoogle = async (req, res, next) => {
  let connect;
  try {
    let { mail, name } = req.body;

    connect = await getConnection();

    const [userExist] = await connect.query(
      `SELECT id_user, user_name FROM users WHERE user_email=?`,
      [mail]
    );

    if (userExist.length > 0) {
      res.status(200).send({
        status: 'ok',
        message: 'Bienvenido de nuevo ' + userExist[0].nombre_usuario,
      });
    } else {
      const [users] = await connect.query(
        `INSERT INTO users (user_email, user_name, active) VALUES (?,?,1)`,
        [mail, name]
      );
      res.status(200).send({
        status: 'ok',
        message: 'Estamos encantados de tenerte con nosotros ' + name,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

export default loginRegisterWithGoogle;
