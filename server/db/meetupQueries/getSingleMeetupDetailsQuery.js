// Function import

import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const getSingleMeetupDetailsQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [meetupDetails] = await connection.query(
      `
   SELECT meetups.*, users.id_user,user_name,picture_url FROM meetups INNER JOIN users ON meetups.id_main_user = users.id_user WHERE id_meetup= ? ;
    `,
      [id]
    );
    if(meetupDetails.length){
      return meetupDetails[0];
    }
    return null
    
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
};

export default { getSingleMeetupDetailsQuery };
