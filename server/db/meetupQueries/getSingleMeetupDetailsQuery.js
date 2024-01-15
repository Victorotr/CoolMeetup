// Function import

import { getConnection } from '../connectionDB.js';

// Query ↓

export const getSingleMeetupDetailsQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [meetupDetails] = await connection.query(
      `
    SELECT m.* FROM meetups m
    GROUP BY m.id
    `,
      [id]
    );

    return meetupDetails;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
  }
};

export default { getSingleMeetupDetailsQuery };
