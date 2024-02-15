// Function import

import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const getMeetupMessagesQuery = async (user_id, id_meetup) => {
    let connection;
    try {
        connection = await getConnection();
        // SELECT meetups.*, users.id_user,user_name,picture_url FROM meetups INNER JOIN users ON meetups.id_main_user = users.id_user WHERE id_meetup= ? 
        const [insertVisit] = await connection.query(
            `
            INSERT INTO meetup_visit(user_id,id_meetup) VALUES(?,?);
            `,
            [user_id, id_meetup]
        );
    
        const [getMessages] = await connection.query(
            `
            SELECT 
            meetup_messages.*,
            JSON_OBJECT('id', users.id_user, 'username', users.user_name, 'avatar', users.picture_url) AS user
        FROM 
            meetup_messages 
        JOIN 
            users ON meetup_messages.user_id = users.id_user
        WHERE 
            id_meetup = ?;
            
            `,
            [id_meetup]
        );
      
        if (getMessages.length) {
            const parsedArray = getMessages.map(message=>{
                return {
                ...message,user:JSON.parse(message.user)
                }
            })
            if(!parsedArray) return null
            return parsedArray
        }
        return null

    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
    }
};

export default { getMeetupMessagesQuery };
