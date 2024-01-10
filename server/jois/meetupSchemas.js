// Npm require ↓

const Joi = require('joi');

// Schemas ↓

const newMeetupJoi = Joi.object().keys({
  title: Joi.string().max(30).required(),
  descrip: Joi.string().max(140),
});

const modifyMeetupJoi = Joi.object().keys({
  title: Joi.string().max(30),
  descrip: Joi.string().max(140),
});

const newCommentMeetupJoi = Joi.object().keys({
  comment: Joi.string().max(145).required(),
});

const commentOfferJoi = Joi.object().keys({
  newComment: Joi.string().max(145).required(),
});

/* const voteMeetupJoi = Joi.object().keys({
  vote: Joi.number().min(1).max(5).required(),
}); */

module.exports = {
  newMeetupJoi,
  modifyMeetupJoi,
  commentOfferJoi,
  newCommentMeetupJoi,
  // voteMeetupJoi,
};
