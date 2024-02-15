// Function import

import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const postMessageMeetup = async (user_id,id_meetup,message) => {
    let connection;
    try {
        connection = await getConnection();
       
     
        const [InsertMessage] = await connection.query(
            `
           INSERT INTO meetup_messages(user_id,id_meetup,message) VALUES(?,?,?);
            `,
            [user_id,id_meetup,message]
        );
       console.log(InsertMessage)
        return null

    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
    }
};

export default { postMessageMeetup };
