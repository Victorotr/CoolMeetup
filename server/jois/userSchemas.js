// Npm require ↓

const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

// Schemas ↓

const newUserJoi = joiPassword.object().keys({
  email: joiPassword.string().email().required(),
  password: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
  user: joiPassword.string().min(4).max(15).required(),
});

const loginJoi = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const modifyUserJoi = Joi.object().keys({
  user: Joi.string().min(4).max(15),
  email: Joi.string().email(),
});

const modifyPwdJoi = joiPassword.object().keys({
  oldPassword: joiPassword.required(),
  newPassword: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
});

const recoverPasswordJoi = Joi.object().keys({
  email: Joi.string().email().required(),
});

const resetPasswordJoi = joiPassword.object().keys({
  recoverCode: joiPassword.required(),
  newPassword: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
});

module.exports = {
  newUserJoi,
  loginJoi,
  modifyUserJoi,
  modifyPwdJoi,
  recoverPasswordJoi,
  resetPasswordJoi,
};
