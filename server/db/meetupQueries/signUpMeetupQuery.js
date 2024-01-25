// Imports ↓

import { generateError } from '../../services/generateError.js';
import { getConnection } from '../ConnectionDB.js';

// Query ↓

export const signUpMeetupQuery = async (meetupId, userId) => {
  let connection;
  try {
    connection = await getConnection();

    // Check the meetupId
    const [meetup] = await connection.query(
      `
      SELECT *
      FROM meetups
      WHERE id = ?
    `,
      [meetupId]
    );

    if (meetup.length === 0) {
      throw generateError('No existe un meetup con ese id', 409);
    }

    try {
      // Check if the user has already signup for this meetup
      const [signupInfo] = await connection.query(
        `
          SELECT id
          FROM users_meetups
          WHERE user_id = ? AND meetup_id = ?
        `,
        [userId, meetupId]
      );

      if (signupInfo === null) {
        // Add user for a meetup
        await connection.query(
          `
            INSERT INTO users_meetups (id_user, id_meetup)
            VALUES (?, ?)
          `,
          [userId, meetupId]
        );
        // Add user in user list of the meetup
        const [userId] = await connection.query(
          `
            INSERT INTO meetups (meetup_attendees)
            VALUES (?)
        `,
          [userId]
        );
      } else {
        throw generateError(
          'El usuario ya está registrado en este meetup',
          403
        );
      }
    } catch (error) {
      console.error(error);
    }
  } finally {
    if (connection) connection.release();
  }
};
