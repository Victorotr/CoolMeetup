// Querie require ↓


import { getSingleMeetupDetailsQuery } from '../../db/meetupQueries/getSingleMeetupDetailsQuery.js'
import {getMeetupMessagesQuery} from '../../db/meetupQueries/getMeetupMessagesQuery.js';
// Controller ↓
export const getSingleMeetupDetails = async (req, res, next) => {
  console.log('get single meetup Details')
  try {
    const { id } = req.params;
    const user_id = req.isUser
    console.log('user id',req.isUser)
    // Query: get meetup by id
    const meetupDetails = await getSingleMeetupDetailsQuery(id);
    const meetupMessages = await getMeetupMessagesQuery(user_id,id);
    console.log('messages',meetupMessages)
    if(meetupDetails){
      res.status(200).send({
        status: 'ok',
        data: meetupDetails,
        messages:meetupMessages
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
