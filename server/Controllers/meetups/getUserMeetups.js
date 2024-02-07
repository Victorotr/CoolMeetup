// Queries requires ↓

import { getUserMeetupsQuery } from '../../db/meetupQueries/getUserMeetupsQuery.js';

// Controller ↓

export const getUserMeetups = async (req, res, next) => {
  try {
    // Query: get all meetups from a user ID
    const {id} = req.params;
    const meetups = await getUserMeetupsQuery(id);
    
    
    res.status(200).send({
      status: 'ok',
      data: meetups,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};
