
import bcrypt from "bcrypt";
import { getConnection } from "../../db/ConnectionDB.js";
import jwt from 'jsonwebtoken';



async function comparePasswords(pwd, dbpwd) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pwd, dbpwd, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export const SignIn = async (req, res) => {
    const expiration = 1000 * 60 * 60 * 24 * 28;
    const sessionOpen = req.body.checked;
    const connection = await getConnection();

    try {
        const { email, pwd } = req.body;
        const [user] = await connection.query('SELECT id_user as id,user_name as username,user_password as pwd,active,google_registered,user_picture FROM users WHERE user_email =?', [email]);
        console.log(user)
        if (!user.length) { return res.status(403).send({ message: 'Usuario no encontrado' }) }
        const dbpwd = user[0].pwd;
        if (user[0].google_registered){
            console.log('google registered') 
            return res.status(403).send({ message: 'Usuario registrado con Google, utiliza el botón de Acceso con Google  para continuar' })
         }
        const compare = await comparePasswords(pwd, dbpwd);
        if (!compare) { return res.status(403).send({ message: 'Usuario o contraseña incorectos' }) }
        if (!user[0].active) { return res.status(403).send({ message: 'Usuario no activado' }) }
        const info = {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            avatar:user[0].user_picture || null
        };
        const token = jwt.sign(info, process.env.SECRET_TOKEN, {
            expiresIn: '28d',
        });
        sessionOpen && res.cookie('user_token', { token: token }, {
            maxAge: expiration,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        });
        res.status(200).send({ status: 'Logged', user: info });

    } catch (error) {
        res.clearCookie('user_token')
        res.status(403).send({ message: 'Problemas con el servidor, por favor intentelo más tarde' })
        console.log(error)
    }
}