import { getConnection } from "../../db/ConnectionDB.js"
import { jwtDecode } from "jwt-decode";

const loginRegisterWithGoogle = async (req, res, next) => {
  let connect;
  try {
    let { credential } = req.body;
    const user_credential = jwtDecode(credential.credential);
    
    const { email, name, picture } = user_credential

    connect = await getConnection();

    const [userExist] = await connect.query(
      `SELECT id_user, user_name,user_email,user_picture FROM users WHERE user_email=?`,
      [email]
    );
    console.log('exist', userExist)
    if (userExist.length > 0) {
      res.status(200).send({
        status: "ok",
        message: "Bienvenido de nuevo " + userExist[0].user_name,
        user: {
          id: userExist[0].id_user,
          username: userExist[0].user_name,
          email: userExist[0].user_email,
        }
      });
    }
    else {
      const [users] = await connect.query(
        `INSERT INTO users (user_email, user_name,user_picture, active) VALUES (?,?,?,1)`,
        [email, name, picture]
      );
      if (users.affectedRows > 0) {
        res.status(200).send({
          status: "ok",
          message: "Estamos encantados de tenerte con nosotros " + name,
          user: {
            id: users.insertId,
            username: name,
            email: email,
          }
        });
      } else {
        res.status(403).send({ status: 'error', message: 'Hubo un problema al registrar el usuario' })
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