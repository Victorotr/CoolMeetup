import { getConnection } from '../ConnectionDB.js';

export const getUserMeetupsAttendeesQuery = async (id) => {
  let connection;
  
  try {
    connection = await getConnection();
    const [userMeetupsAttendees] = await connection.query(
      `
      SELECT 
      meetups.*,
      JSON_OBJECT('user_id', users.id_user, 'username', users.user_name, 'avatar', users.picture_url) 
      as main_user_details,
      COUNT(users_meetups.id_user) as assistants 
       FROM meetups 
      LEFT JOIN users_meetups ON users_meetups.id_meetup = meetups.id_meetup
      LEFT JOIN users ON meetups.id_main_user = users.id_user
      WHERE users_meetups.id_user = ?
      GROUP BY users_meetups.id_meetup;`,
      [id]
    );

    const parsedArray = userMeetupsAttendees.map((item) => { return { ...item, main_user_details: JSON.parse(item.main_user_details) } });

    return parsedArray || null;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
};
