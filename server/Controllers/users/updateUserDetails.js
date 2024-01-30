import { getConnection } from "../../db/ConnectionDB.js";
import fs from 'fs'
export const UpdateUserDetails = async (req, res) => {
    let connection;
    const fileUrl = req.file && req.file.originalname ? process.env.IMAGE_URL + req.file.originalname +"/Avatar" : null;
    const fileName = req.file && req.file.originalname ? req.file.originalname : null;
    console.log('fileurl',fileUrl)
    try {
        console.log(fileName)

        const SuccessResponse = () => {
            return res.status(200).send({ status: 'OK', message: 'Usuario actualizado' });
        }
        const id = req.isUser
        const { bio } = req.body;


        connection = await getConnection();
        if (fileUrl) {
            const [oldPicture] = await connection.query('SELECT user_picture FROM users WHERE id_user = ?', [id]);
           
            try {
                if (oldPicture && oldPicture[0].user_picture) {
                    fs.unlinkSync(`./Controllers/users/avatars/${oldPicture[0].user_picture}`)
                }

            } catch (error) {
                console.log('no se ha podido borrar la foto antigua')
            }

            const [update] = await connection.query(`UPDATE users SET user_bio =?,user_picture = ?,picture_url = ? WHERE id_user = ?`,
                [bio, fileName, fileUrl, id])
            console.log(update);
            if (update.affectedRows > 0) {
                SuccessResponse();
            }

        } else {
            const [update] = await connection.query(`UPDATE users SET user_bio =? WHERE id_user = ?`,
                [bio, id]);
            if (update.affectedRows > 0) {
                SuccessResponse();
            } 
        }

    } catch (error) {
        console.log(error);
        if (fileName) {
            fs.unlinkSync(`./Controllers/users/avatars/${req.file.originalname}`)
        }
    }finally{
        connection?.release()
    }


}