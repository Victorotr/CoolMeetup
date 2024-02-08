// Querie require ↓

import { signUpMeetupQuery } from '../../db/meetupQueries/signUpMeetupQuery.js';

// Controller ↓

export const signUpMeetup = async (req, res, next) => {
  try {
    const meetupId = req.params.meetupId;
    const userId = req.isUser || null;
    if (!meetupId || !userId) {
      return res.status(403).send({ message: 'Problema de autenticación o al encontrar el meetup' })
    }

    // Query: like comment
    const signUpInfo = await signUpMeetupQuery(meetupId, userId);

    if (signUpInfo.action === 'added') {
      res.status(200).send({
        status: 'ok',
        message: `Te has apuntado correctamente a ${signUpInfo.title}`,
        data: {
          user: userId,
          meetup: meetupId,
          data: signUpInfo,
        },
      });
    } else {
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
