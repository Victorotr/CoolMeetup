// Queries requires ↓

 import {cancelMeetupQuery } from '../../db/meetupQueries/cancelMeetupQuery.js';

// Controller ↓

export const cancelMeetup = async (req, res, next) => {
  try {
    const meetup_id=req.body.meetup_id || null;
    const user = req.isUser;
    console.log(meetup_id,user)
  

   console.log('cancel meetup')
     const check = await cancelMeetupQuery(meetup_id,user);
     
    if(check){
        res.status(200).send({
            status: 'ok',
            data: check,
          });
    }
  
   
  } catch (error) {
    res.status(403).send({
        status: 'failed',
        message: 'Algo ha ido mal al cancelar el meetup',
      });
    next(error);
  }
};
