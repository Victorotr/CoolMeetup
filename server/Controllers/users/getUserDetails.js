import { getConnection } from "../../db/ConnectionDB.js";



export const getUserDetails = async (req, res, next) => {

    let connect;

    try {
        const { id } = req.params;
        if (!id) {
            const error = new Error("Usuario no disponible o no existe");
            error.httpStatus = 404;
            // envio el error y salgo de la función
            return next(error)
        }

        connect = await getConnection();
        const [user] = await connect.query('SELECT id_user,user_name,picture_url,user_bio FROM users WHERE id_user = ?', id)
   
        if (!user.length) {
            const error = new Error("Usuario no encontrado"); error.httpStatus = 404;  // envio el error y salgo de la función
            return next(error)
        }
        const {id_user,user_name,picture_url, user_bio} = user[0];
        res.status(200).send(
            { 
            status: 'OK', 
            message: 'Datos usuarios cargados correctamente', 
            user: {id:id_user, username: user_name, avatar:picture_url,bio:user_bio} 
        })
    } catch (err) {
        console.log(err);
        const error = new Error("Problemas con el servidor"); error.httpStatus = 404;  // envio el error y salgo de la función
        return next(error)
    }finally{
        connect?.release()
    }


}