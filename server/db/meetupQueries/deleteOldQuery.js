import { getConnection } from '../ConnectionDB.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
export const deleteOldMeetupQuery = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const thisfolder = dirname(__filename);
    const connection = await getConnection();
    const MaxDate = new Date();


    const imageFolder = join(thisfolder, '..', '..', '/Controllers/users/meetup/');

    async function eliminarImagenes(meetupImages, imageFolder) {
        try {

            for (const image of meetupImages) {
                const rutaImagen = imageFolder + image.meetup_image_id;

                if (image.meetup_image_id) {
                    await fs.unlink(rutaImagen);
                }
            }

        } catch (error) {
            console.error("Error al eliminar imágenes:", error);
        }
    }

    try {


        const [deleteMeetups] = await connection.query(` 
        DELETE FROM meetups
        WHERE meetup_datetime < ?;`, [MaxDate]
        );
        console.log(deleteMeetups.affectedRows, 'meetups eliminados')
        const [deleteAssistants] = await connection.query(`
        DELETE FROM users_meetups
        WHERE id_meetup NOT IN (
        SELECT id_meetup
        FROM meetups
        );
        `)
        console.log(deleteAssistants.affectedRows, 'asistentes eliminados')
        const [getImages] = await connection.query(`SELECT meetup_image_id FROM meetups WHERE meetup_datetime < ?;`, [MaxDate]);

        if (getImages.length) {
            eliminarImagenes(getImages, imageFolder);
        }
        return


    } catch (error) {
        console.log(error)
    } finally {
        if (connection) { connection.release() }
    }
}