// Function require ↓
import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const getAllMeetupsQuery = async (filters) => {
  let connection;
  const mysqlDate = filters.date.split("/").reverse().join("-");
  console.log(mysqlDate);
  try {
    connection = await getConnection();
    const [allMeetups] = await connection.query(`
        SELECT m.* FROM meetups m  WHERE m.meetup_datetime = ?`,[mysqlDate]);

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
