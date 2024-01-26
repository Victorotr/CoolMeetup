// Npm require ↓

const Joi = require('joi');

// Schemas ↓



const newMeetupJoi = Joi.object().keys({
  user_id: Joi.any().required(),
  title: Joi.string().max(30).required(),
  description: Joi.string().max(500).required(),
  category: Joi.string().max(30).required(),
  meetupDate:Joi.date().required(),
  address:Joi.string().required()
});

/*
const modifyMeetupJoi = Joi.object().keys({
  title: Joi.string().max(30),
  descrip: Joi.string().max(140),
});

const newCommentMeetupJoi = Joi.object().keys({
  comment: Joi.string().max(145).required(),
});

const commentMeetupJoi = Joi.object().keys({
  newComment: Joi.string().max(145).required(),
});

/* const voteMeetupJoi = Joi.object().keys({
  vote: Joi.number().min(1).max(5).required(),
}); */

module.exports = { newMeetupJoi };
