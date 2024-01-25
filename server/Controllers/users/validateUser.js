import {getConnection} from "../../db/ConnectionDB.js"

const validateUser = async (req, res, next) => {
  let connect;
  try {
    connect = await getConnection();
    const { regCode } = req.body;
    const [user] = await connect.query(
      `
            SELECT id_user
            FROM users
            WHERE regCode=?
            `,
      [regCode]
    );

    //si no existe retorno un error
    if (user.length === 0) {
      const error = new Error("Ningún usuario con ese código");
      error.httpStatus = 404;
      throw error;
    }

    //activamos el usuario u eliminamos el codigo de registro
    await connect.query(
      `
            UPDATE users
            SET active=1, regCode=NULL
            WHERE regCode = ?
            `,
      [regCode]
    );

    res.status(200).send({
      status: "success",
      message: "Usuario validado",
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

export default validateUser;
