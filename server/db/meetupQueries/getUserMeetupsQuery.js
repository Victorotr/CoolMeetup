import { getConnection } from '../ConnectionDB.js';


//old query   
//  `
//       // SELECT 
//       // meetups.*,
//       // JSON_OBJECT('user_id', users.id_user, 'username', users.user_name, 'avatar', users.picture_url) 
//       // as main_user_details,
//       // COUNT(users_meetups.id_user) as assistants 
//       // FROM meetups 
//       // LEFT JOIN users ON meetups.id_main_user = users.id_user
//       // LEFT JOIN users_meetups ON users_meetups.id_meetup = meetups.id_meetup
//       // WHERE meetups.id_main_user = ?`
export const getUserMeetupsQuery = async (id) => {
  let connection;
 
  try {
    connection = await getConnection();
    const [userMeetups] = await connection.query(
      `SELECT 
      meetups.*,
      JSON_OBJECT('user_id', users.id_user, 'username', users.user_name, 'avatar', users.picture_url) 
      as main_user_details,
      COALESCE(COUNT(users_meetups.id_user), 0) as assistants 
      FROM meetups 
      LEFT JOIN users ON meetups.id_main_user = users.id_user AND meetups.id_main_user = ?
      LEFT JOIN users_meetups ON users_meetups.id_meetup = meetups.id_meetup
      WHERE meetups.id_main_user = ? GROUP BY meetups.id_meetup, users.id_user`,

      [id,id]
    );
    console.log('query results',userMeetups)
    const parsedArray = userMeetups.map((item) => { return { ...item, main_user_details: JSON.parse(item.main_user_details) } });
    return parsedArray || null;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
};
