// Functions requires ↓

import { generateError } from '../../services/generateError.js';

// Querie require ↓

import { postMeetupQuery } from '../../db/meetupQueries/postMeetupQuery.js';

// Joi require ↓

import meetupJoi from '../../jois/meetupSchemas.cjs';
const { newMeetupJoi } = meetupJoi;
// Controller ↓

export const postMeetup = async (req, res, next) => {
  try {
    const {
      meetup_title,
      meetup_description,
      meetup_province,
      meetup_town,
      meetup_datetime,
    } = req.body;

    const { id } = req.isUser.id; // ¿? Puede que haya que modificarlo *

    // Joi validation
    const schema = newMeetupJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    const meetupDatetime = new Date(meetup_datetime);
    const date = new Date();

    if (date.getTime() > meetupDatetime.getTime()) {
      throw generateError(
        'La fecha del meetup no puede ser anterior a hoy',
        401
      );
    }

    // Query: Create offer
    const meetupId = await postMeetupQuery(
      id,
      meetup_title,
      meetup_description,
      meetup_province,
      meetup_town,
      meetup_datetime
    );

    // Res.send
    res.status(201).send({
      status: 'ok',
      message: `Meetup con id (${meetupId}) creada con éxito`,
      data: {
        id: meetupId,
      },
    });
  } catch (error) {
    next(error);
  }
};
