// Queries requires ↓

import { getUserMeetupsAttendeesQuery } from '../../db/meetupQueries/getUserMeetupsAttendeesQuery.js';

// Controller ↓

export const getUserMeetupsAttendees = async (req, res, next) => {
  try {
    // Query: get all meetups from a user ID
    const {id} = req.params;
    const meetups = await getUserMeetupsAttendeesQuery(id);

    // Res.send
    res.status(200).send({
      status: 'ok',
      data: meetups,
    });
  } catch (error) {
    next(error);
  }
};
