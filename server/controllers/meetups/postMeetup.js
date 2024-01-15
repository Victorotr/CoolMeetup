// Querie require ↓

import { postMeetupQuery } from '../../db/meetupQueries/postMeetupQuery.js';

// Controller ↓
export const postMeetup = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query: get meetup by id
    const postMeetup = await postMeetupQuery(id);
    // Res.send
    res.status(200).send({
      status: 'ok',
      data: postMeetup,
    });
  } catch (error) {
    next(error);
  }
};
