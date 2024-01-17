// Function require ↓

import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const getAllMeetupsQuery = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [allMeetups] = await connection.query(`
        SELECT m.* FROM meetups m `);

    allMeetups.sort((a, b) => {
      return b.created_at - a.created_at;
    });

    return allMeetups;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
};
