// Querie require ↓

import { signUpMeetupQuery } from '../../db/meetupQueries/signUpMeetupQuery.js';

// Controller ↓

export const signUpMeetup = async (req, res, next) => {
  try {
    const meetupId = req.params.meetupId;
    const userId = req.isUser || null; // ¿? Puede que haya que modificar la manera de traer el id**
    if(!meetupId || !userId){return res.status(403).send({message:'Problema de autenticación o al encontrar el meetup'})}
    console.log(meetupId,userId)
    // Query: like comment
   const signUpInfo = await signUpMeetupQuery(meetupId, userId);
   console.log(signUpInfo)
   if(signUpInfo.action === 'added'){
    res.status(200).send({
      status: 'ok',
      message: `Te has apuntado correctamente a ${signUpInfo.title}`,
      data: {
        user: userId,
        meetup: meetupId,
        data: signUpInfo,
      },
    });
   }else{
    res.status(200).send({
      status: 'ok',
      message: `Te has desapuntado correctamente a ${signUpInfo.title}`,
    });
   }
  
  } catch (error) {
    console.log(error)
    next(error);
  }
};
