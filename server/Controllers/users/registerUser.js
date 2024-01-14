import {getConnection} from "../../db/ConnectionDB.js"
import Joi from "joi";
import bcrypt from "bcrypt";
import {uuid} from "uuidv4";
import sendMail from "../../services/sendMail.js"

const registerUser = async (req, res, next) => {
  let connect;
  try {
    let { mail, pwd, name } = req.body;
       
    //validaciones básicas
    const schema = Joi.object({
      password: Joi.string().pattern(
        new RegExp("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$")
      ),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "es", "org"] },
      }),
    });
    try {
      await schema.validateAsync({
        password: pwd,
        email: mail,
      });
    } catch (err) {
      const error = new Error("La contraseña o el email no cumple con los estándares de seguridad propuestos");
      error.httpStatus = 404;
      next(error);
    }

    connect = await getConnection();
    
    const [userExist] = await connect.query(
      `SELECT id_user FROM users WHERE email_usuario=?`,
      [mail]
    );

    if (userExist.length > 0) {
      const error = new Error("El e-mail utilizado ya existe en la base de datos");
      error.httpStatus = 409;
      throw error;
    }

    /**preparo para mandar mail de confirmacion */
    //primero generamos un codigo de registro con uuidv4
    const regCode = uuid();

    /**armamos el body del mail */
    const bodyMail = `
        Te registraste en CoolMeetups.com.
        Pulsa el enlace para activar la cuenta: ${process.env.PUBLIC_HOST}${regCode}
        `;
    /**llamo a enviar mail */
    
    //sendMail(mail, "Correo de verificación CoolMeetups.com", bodyMail); COMENTADO PARA MIENTRAS PROBAMOS NO ENVIE E-MAILS

    //hasear password
    async function passToBd() {
      bcrypt.hash(pwd, 10, async function (err, hash) {
        const [users] = await connect.query(
          //SHA2 es un estandar de cifrado que recibe como parámetro la llave que se utilizara y el número de bits del HASH,
          //de esta forma el valor será cifrado y se almacenará en la base de datos
          //SHA --> Secure Hash Algorithm
          `INSERT INTO users (email_usuario, password_usuario, regCode, nombre_usuario) VALUES (?,?,?,?)`,
          [mail, hash, regCode, name]
        );
      });
    }

    passToBd().then(() => {
      res.status(200).send({
        status: "ok",
        message: "Usuario registrado con éxito",
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    connect?.release();
  }
};

export default registerUser;