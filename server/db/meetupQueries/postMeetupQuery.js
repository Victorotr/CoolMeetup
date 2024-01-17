// Function require ↓

import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const postMeetupQuery = async (
  id,
  meetup_title,
  meetup_description,
  meetup_province,
  meetup_town,
  meetup_datetime
) => {
  let connection;

  try {
    const connection = await getConnection();

    // Insert data
    const [offer] = await connection.query(
      `INSERT INTO meetups (id_main_user, meetup_title, meetup_description, meetup_province, meetup_town, meetup_datetime)
       VALUES(?, ?, ?, ?, ?, ?)`,
      [
        id,
        meetup_title,
        meetup_description,
        meetup_province,
        meetup_town,
        meetup_datetime,
      ]
    );

    // Return ID
    return offer.insertId;
  } finally {
    if (connection) connection.release();
  }
};
