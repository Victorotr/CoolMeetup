// Querie require ↓


import { getSingleMeetupDetailsQuery } from '../../db/meetupQueries/getSingleMeetupDetailsQuery.js'

// Controller ↓
export const getSingleMeetupDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query: get meetup by id
    const meetupDetails = await getSingleMeetupDetailsQuery(id);
    if(meetupDetails){
      res.status(200).send({
        status: 'ok',
        data: meetupDetails,
      });
    }else{
      res.status(404).send({
        status: 'FAILED',
        data: null,
      });
    }
    // Res.send
   
  } catch (error) {
    next(error);
  }
};
