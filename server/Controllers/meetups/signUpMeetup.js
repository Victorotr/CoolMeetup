// Querie require ↓

import { signUpMeetupQuery } from '../../db/meetupQueries/signUpMeetupQuery.js';

// Controller ↓

export const signUpMeetup = async (req, res, next) => {
  try {
    const meetupId = req.params.commentId;
    const userId = req.isUser.id; // ¿? Puede que haya que modificar la manera de traer el id**

    // Query: like comment
    const signUpInfo = await signUpMeetupQuery(meetupId, userId);

    res.status(201).send({
      status: 'ok',
      message: `Usuario con id ${userId} registrado en el meetup con id ${meetupId}`,
      data: {
        user: userId,
        meetup: meetupId,
        data: signUpInfo,
      },
    });
  } catch (error) {
    next(error);
  }
};
