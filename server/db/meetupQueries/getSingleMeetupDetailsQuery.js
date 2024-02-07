// Function import

import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const getSingleMeetupDetailsQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    // SELECT meetups.*, users.id_user,user_name,picture_url FROM meetups INNER JOIN users ON meetups.id_main_user = users.id_user WHERE id_meetup= ? 
    const [meetupDetails] = await connection.query(
      `
      SELECT meetups.*, 
      users.id_user, 
      users.user_name, 
      COALESCE(users.picture_url, 'URL_predeterminada') as picture_url,
      CONCAT('[', GROUP_CONCAT(
          CONCAT(
              '{"id_user": ', users_meetups.id_user,
              ', "user_name": "', u.user_name,
              '", "picture_url": "', COALESCE(u.picture_url, 'URL_predeterminada'), '"}'
          )
      ), ']') AS assistants
      FROM meetups 
      LEFT JOIN users ON meetups.id_main_user = users.id_user 
      LEFT JOIN users_meetups ON users_meetups.id_meetup = meetups.id_meetup 
      LEFT JOIN users u ON users_meetups.id_user = u.id_user
      WHERE meetups.id_meetup = ?
      GROUP BY meetups.id_meetup, users.id_user, users.user_name;

    `,
      [id]
    );
    if (meetupDetails.length) {
      console.log(meetupDetails[0])
      meetupDetails[0].assistants = JSON.parse(meetupDetails[0].assistants)


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
