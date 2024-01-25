import jsonwebtoken from 'jsonwebtoken';
import { getConnection } from '../../db/ConnectionDB.js';


export const isLogged = async (req, res) => {
    const connection = await getConnection();
    const userAgent = req.headers['user-agent'];
    console.log(typeof(userAgent))
    try {

        if (req.cookies && req.cookies.user_token) {

            const token = req.cookies.user_token.token;

            const validate = jsonwebtoken.verify(token, process.env.SECRET_TOKEN);

            const id = validate.id

            const [user] = await connection.query('SELECT user_name as username,user_bio as bio,picture_url as avatar from users WHERE id_user =?', [id])
            const userInfo = {
                id: id,
                username: user[0].username,
                bio: user[0].bio,
                avatar: user[0].avatar
            }
        res.status(200).send({ user: userInfo })
        } else {
            res.status(200).send({ user: null })
        }


    } catch (error) {
        console.log(error)

        res.clearCookie('user_token')
        res.status(403).send({ message: 'Problemas con el servidor, por favor intentelo más tarde' })

    } finally {
        if (connection) { connection.release() }
    }
}