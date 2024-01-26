// Function require ↓
import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const getAllMeetupsQuery = async (filters) => {
  let connection;
  const mysqlDate = filters.date.split("/").reverse().join("-");
  const theme = filters.tematica;
  const province = filters.provincia;
  let themeFilter = "";
  let provinceFilter = "";
  theme != "Todas" ? themeFilter = " AND m.meetup_theme = '"+theme+"'" : themeFilter = "";
  province != "Todas" ? provinceFilter = " AND m.meetup_town = '"+province+"'" : provinceFilter = "";
  try {
    connection = await getConnection();
    const [allMeetups] = await connection.query(`
        SELECT m.*, u.id_user,u.user_name,u.picture_url FROM meetups m INNER JOIN users u on u.id_user = m.id_main_user WHERE m.meetup_datetime >= ? ${themeFilter} ${provinceFilter}`,[mysqlDate]);

    allMeetups.sort((a, b) => {
      return b.meetup_datetime - a.meetup_datetime;
    });

    return allMeetups;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
};
