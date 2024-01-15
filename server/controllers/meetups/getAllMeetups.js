// Queries requires ↓

import { getAllMeetupsQuery } from '../../db/meetupQueries/getAllMeetupsQuery.js';

// Controller ↓

export const getAllMeetups = async (req, res, next) => {
  try {
    // Query: get all meetups
    const meetups = await getAllMeetupsQuery();

    // Res.send
    res.status(201).send({
      status: 'ok',
      data: meetups,
    });
  } catch (error) {
    next(error);
  }
};
