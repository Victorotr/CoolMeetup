import { getConnection } from '../../db/ConnectionDB.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import sendMail from '../../services/sendMail.js';
let connect;
connect = await getConnection();

async function passToBd(mail, pwd, regCode, name) {
  bcrypt.hash(pwd, 10, async function (err, hash) {
    // eslint-disable-next-line no-unused-vars
    const [users] = await connect.query(
      //SHA2 es un estandar de cifrado que recibe como parámetro la llave que se utilizara y el número de bits del HASH,
      //de esta forma el valor será cifrado y se almacenará en la base de datos
      //SHA --> Secure Hash Algorithm
      `INSERT INTO users (user_email, user_password, regCode, user_name) VALUES (?,?,?,?)`,
      [mail, hash, regCode, name]
    );
  });
}

const registerUser = async (req, res, next) => {
  try {
    let { mail, pwd, name } = req.body;

    //validaciones básicas
    const schema = Joi.object({
      password: Joi.string().pattern(
        new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$')
      ),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es', 'org'] },
      }),
    });
    try {
      await schema.validateAsync({
        password: pwd,
        email: mail,
      });
    } catch (err) {
      const error = new Error(
        'La contraseña o el email no cumple con los estándares de seguridad propuestos'
      );
      error.httpStatus = 404;
      // envio el error y salgo de la función
      return next(error);
    }

    const [userExist] = await connect.query(
      `SELECT id_user FROM users WHERE user_email=?`,
      [mail]
    );

    if (userExist.length > 0) {
      const error = new Error(
        'El e-mail utilizado ya existe en la base de datos'
      );
      error.httpStatus = 409;
      // envio el error y salgo de la función
      return next(error);
    }

    /**preparo para mandar mail de confirmacion */
    //primero generamos un codigo de registro con uuidv4
    const regCode = uuid();

    /**armamos el body del mail */
    const bodyMail = `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
       
        <style>
            /* Estilos para hacer el correo electrónico responsive */
            @media screen and (max-width: 600px) {
                .container {
                    width: 100% !important;
                }
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 20px 0; text-align: center;">
                    <h1 style="margin-bottom: 20px;">Bienvenido/a a CoolMeetups</h1>
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Te has registrado con exíto en CoolMeetups!</p>
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Solo falta un paso más</p>
                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Pulsa el enlace para activar la cuenta:</p>
                    <a href="${process.env.PUBLIC_HOST}${regCode}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Activar cuenta</a>
                </td>
            </tr>
        </table>
    </body>
    </html>

        `;
    /**llamo a enviar mail */

    sendMail(mail, "Correo de verificación CoolMeetups.com", bodyMail);

    //hasear password

    passToBd(mail, pwd, regCode, name).then(() => {
      res.status(200).send({
        status: 'ok',
        message:
          'Usuario registrado con éxito, revisa tu correo para activar tu cuenta',
      });
    });
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send({
        status: 'error',
        message: 'Hubo un error con la contraseña o el correo',
      });
    return next(error);
  } finally {
    connect?.release();
  }
};

export default registerUser;
