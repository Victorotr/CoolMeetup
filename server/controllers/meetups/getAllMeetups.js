// Queries requires ↓

import { getAllMeetupsQuery } from '../../db/meetupQueries/getAllMeetupsQuery.js';

// Controller ↓

export const getAllMeetups = async (req, res, next) => {
  try {
    // Query: get all meetups filtered
    const filters = req.body;
   
    const meetups = await getAllMeetupsQuery(filters);

    // Res.send
    res.status(200).send({
      status: 'ok',
      data: meetups,
    });
  } catch (error) {
    next(error);
  }
};
