// Querie require ↓

import { getSingleMeetupDetailsQuery } from '../../db/meetupQueries/getSingleMeetupDetailsQuery.js'
// Controller ↓
export const getSingleMeetupDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query: get meetup by id
    const meetupDetails = await getSingleMeetupDetailsQuery(id);
    // Res.send
    res.status(200).send({
      status: 'ok',
      data: meetupDetails,
    });
  } catch (error) {
    next(error);
  }
};
