import { getConnection } from '../../db/ConnectionDB.js';
import { jwtDecode } from 'jwt-decode';
import jwt from 'jsonwebtoken';

const loginRegisterWithGoogle = async (req, res, next) => {
  let connect;
  try {
    let { credential } = req.body;

    const user_credential = jwtDecode(credential.credential);

    const { email, name, picture } = user_credential;

    connect = await getConnection();

    const [userExist] = await connect.query(
      `SELECT id_user, user_name,user_email,user_picture FROM users WHERE user_email=?`,
      [email]
    );
    if (userExist.length > 0) {
      res.status(200).send({
        status: 'ok',
        message: 'Bienvenido de nuevo ' + userExist[0].user_name,
        user: {
          id: userExist[0].id_user,
          username: userExist[0].user_name,
          email: userExist[0].user_email,
          avatar: userExist[0].user_picture || null,
        },
      });
    } else {
      const [users] = await connect.query(
        `INSERT INTO users (user_email, user_name,user_picture, active,google_registered) VALUES (?,?,?,1,1)`,
        [email, name, picture]
      );
      if (users.affectedRows > 0) {
        const expiration = 1000 * 60 * 60 * 24 * 28;
        const info = {
          id: users.insertId,
          username: name,
          email: email,
          avatar: picture || null,
        };
        const token = jwt.sign(info, process.env.SECRET_TOKEN, {
          expiresIn: '28d',
        });
        res.cookie('user_token', { token: token }, {
          maxAge: expiration,
          httpOnly: true,
          secure: false,
          sameSite: 'none',
          path: '/'
        });
        res.status(200).send({
          status: 'ok',
          message: 'Estamos encantados de tenerte con nosotros ' + name,
          user: {
            id: users.insertId,
            username: name,
            email: email,
          },
        });
      } else {
        res.status(403).send({
          status: 'error',
          message: 'Hubo un problema al registrar el usuario',
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

export default loginRegisterWithGoogle;
