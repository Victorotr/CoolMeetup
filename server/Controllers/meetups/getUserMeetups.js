// Queries requires ↓

import { getUserMeetupsQuery } from '../../db/meetupQueries/getUserMeetupsQuery.js';

// Controller ↓

export const getUserMeetups = async (req, res, next) => {
  try {
    // Query: get all meetups from a user ID
    const {id} = req.params;
    const meetups = await getUserMeetupsQuery(id);

    // Res.send
    res.status(200).send({
      status: 'ok',
      data: meetups,
    });
  } catch (error) {
    next(error);
  }
};