import { getConnection } from '../ConnectionDB.js';

export const getAllMeetupsQuery = async (filters) => {
  let connection;
  const mysqlDate = filters.date.split("/").reverse().join("-");
  
  const theme = filters.tematica;
  const province = filters.provincia;
  const order = filters.order === 'Fecha' ? 'meetup_datetime ASC' : filters.order === 'Asistentes' ? 'assistants DESC' : 'meetup_datetime ASC'
  console.log('order', order)
  let themeFilter = "";
  let provinceFilter = "";
  
  theme !== "Todas" ? (themeFilter = " AND meetups.meetup_theme = '" + theme + "'") : (themeFilter = "");
  province !== "Todas" ? (provinceFilter = " AND meetups.meetup_town = '" + province + "'") : (provinceFilter = "");
  try {
    connection = await getConnection();
    const [allMeetups] = await connection.query(
      `
    SELECT 
      meetups.*,
      JSON_OBJECT('user_id', users.id_user, 'username', users.user_name, 'avatar', users.picture_url) 
      as main_user_details,
      COUNT(users_meetups.id_user) as assistants 
      FROM meetups 
      LEFT JOIN users ON meetups.id_main_user = users.id_user
       LEFT JOIN users_meetups ON users_meetups.id_meetup = meetups.id_meetup 
      WHERE meetups.meetup_datetime >= ? ${themeFilter} ${provinceFilter} 
      GROUP BY meetups.id_meetup ORDER BY ${order};
   `,
      [mysqlDate]
    );

    const parsedArray = allMeetups.map((item) => { return { ...item, main_user_details: JSON.parse(item.main_user_details) } });

    return parsedArray || null;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
};
