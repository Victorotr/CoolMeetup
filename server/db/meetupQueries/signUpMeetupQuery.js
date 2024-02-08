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
      WHERE id_meetup = ?
    `,
      [meetupId]
    );
    console.log('meetmup',meetup)
    if (meetup.length < 1) {
      throw generateError('No existe un meetup con ese id', 409);
    }

    try {
      // Check if the user has already signup for this meetup
      const [signupInfo] = await connection.query(
        `
          SELECT id
          FROM users_meetups
          WHERE id_user = ? AND id_meetup = ?
        `,
        [userId, meetupId]
      );

      if (!signupInfo.length) {
        // Add user for a meetup
        console.log('adding to meetup ')
        await connection.query(
          `
            INSERT INTO users_meetups (id_user, id_meetup)
            VALUES (?, ?)
          `,
          [userId, meetupId]
        );
        return {action:'added',title:meetup[0].meetup_title}
      
      } else {
        const [deleteJoin]= await connection.query(`DELETE FROM users_meetups WHERE id_user = ? AND id_meetup = ?`,[userId,meetupId]);
        
        console.log(deleteJoin)
        return  {action:'deleted',title:meetup[0].meetup_title}
      }
    } catch (error) {
      console.log(error)
      throw generateError('Algo ha ido mal ', 409);
    
    }
  } finally {
    if (connection) connection.release();
  }
};
